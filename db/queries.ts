import { notFound } from "next/navigation";
import db from "./drizzle";
import { clients, trackedProfiles } from "./schema";
import { eq, isNull } from "drizzle-orm";
import { FOLLOWERS } from "@/constants";
import { auth, currentUser } from "@clerk/nextjs/server";

export const isAdmin = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role;

  return role === "admin";
};

export const isUser = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role;

  return role !== "admin" && role !== "partner";
};

export const requireAuth = async () => {
  const user = await auth();
  const userId = user.userId;
  if (!userId) {
    throw new Error("Unauthorized 403");
  }
  const isUserVal = await isUser();
  if (isUserVal) {
    throw new Error("You are not an admin or partner 403");
  }
};

export async function getClientsWithStats() {
  await requireAuth();

  const clientsData = await db.query.clients.findMany({
    with: {
      campaigns: {
        with: {
          ads: true,
        },
      },
    },
    orderBy: (clients, { asc }) => [asc(clients.createdAt)],
    where: (await isAdmin()) ? undefined : eq(clients.display, true),
  });

  const clientsWithStats = clientsData.map((client) => {
    const campaignCounts = client.campaigns.length;

    const activeCampaign = client.campaigns.find(
      (campain) => campain.status === "active"
    );

    const totalAds = activeCampaign?.ads.length || 0;

    const totalLimitedAds = activeCampaign?.isLimited
      ? (activeCampaign.facebookLimit ?? 0) +
        (activeCampaign.instagramLimit ?? 0) +
        (activeCampaign.telegramLimit ?? 0)
      : undefined;

    let status: "active" | "ended" = activeCampaign
      ? activeCampaign?.status
      : "ended";

    return {
      id: client.id,
      name: client.name,
      imageUrl: client.imageUrl,
      display: client.display,
      campaignCounts,
      totalAds,
      totalLimitedAds,
      status,
      createdAt: client.createdAt,
    };
  });

  return clientsWithStats;
}

export async function getClientDetailsById(id: number) {
  await requireAuth();

  const clientData = await db.query.clients.findFirst({
    where: (clients, { eq }) => eq(clients.id, id),
    with: {
      campaigns: {
        with: {
          ads: {
            orderBy: (ads, { asc }) => [asc(ads.publishDate)],
          },
        },
        orderBy: (campaigns, { desc, asc }) => [
          asc(campaigns.status),
          desc(campaigns.startDate),
          desc(campaigns.createdAt),
        ],
      },
    },
  });

  if (!clientData) {
    notFound();
  }

  const transformedClient = {
    ...clientData,
    campaigns: clientData.campaigns.map((campaign) => {
      const facebookAds = campaign.ads.filter(
        (ad) => ad.platform === "facebook"
      );
      const instagramAds = campaign.ads.filter(
        (ad) => ad.platform === "instagram"
      );
      const telegramAds = campaign.ads.filter(
        (ad) => ad.platform === "telegram"
      );

      return {
        id: campaign.id,
        name: campaign.name,
        status: campaign.status,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        isLimited: campaign.isLimited,
        createdAt: campaign.createdAt,
        clientId: campaign.clientId,
        totalAds: campaign.ads.length,
        platforms: {
          facebook: {
            ads: facebookAds,
            limit: campaign.facebookLimit,
          },
          instagram: {
            ads: instagramAds,
            limit: campaign.instagramLimit,
          },
          telegram: {
            ads: telegramAds,
            limit: campaign.telegramLimit,
          },
        },
      };
    }),
  };

  return transformedClient;
}

export async function getClients() {
  await requireAuth();

  const clients = await db.query.clients.findMany();
  return clients;
}

export async function getUsers() {
  await requireAuth();

  const users = await db.query.users.findMany();
  return users;
}

export async function getTransactions() {
  await requireAuth();

  const data = await db.query.transactions.findMany({
    with: {
      client: true,
      recipient: true,
    },
    orderBy: (transactions, { desc }) => [desc(transactions.date)],
    where: (transactions) => isNull(transactions.archiveId),
  });

  const archivedData = await db.query.transactionsArchive.findFirst({
    orderBy: (transactionsArchive, { desc }) => [
      desc(transactionsArchive.date),
    ],
  });

  const incomeTransactions = data.filter(
    (transaction) => transaction.type === "income"
  );

  const expenseTransactions = data.filter(
    (transaction) => transaction.type === "expense"
  );

  const incomeAmount = incomeTransactions.reduce((sum, transaction) => {
    return sum + transaction.amount;
  }, 0);

  const expenseAmount = expenseTransactions.reduce((sum, transaction) => {
    return sum + transaction.amount;
  }, 0);

  const netAmount = incomeAmount - expenseAmount;

  // Archived Data
  const lastIncomeAmount = Number(archivedData?.totalIncome) || incomeAmount;
  const lastExpenseAmount = Number(archivedData?.totalExpense) || expenseAmount;
  const lastNetAmount = Number(archivedData?.netProfit) || netAmount;

  // Trend Data
  const netPercentage =
    lastNetAmount === 0
      ? 0
      : ((netAmount - lastNetAmount) / lastNetAmount) * 100;

  const incomePercentage =
    lastIncomeAmount === 0
      ? 0
      : ((incomeAmount - lastIncomeAmount) / lastIncomeAmount) * 100;

  const expensePercentage =
    lastExpenseAmount === 0
      ? 0
      : ((expenseAmount - lastExpenseAmount) / lastExpenseAmount) * 100;

  // Returned Data
  const transactionsData = {
    data,
    netTransaction: {
      amount: netAmount,
      lastAmount: lastNetAmount,
      counts: data.length,
      trend: netPercentage,
    },
    incomeTransactions: {
      amount: incomeAmount,
      lastAmount: lastIncomeAmount,
      counts: incomeTransactions.length,
      trend: incomePercentage,
    },
    expenseTransactions: {
      amount: expenseAmount,
      lastAmount: lastExpenseAmount,
      counts: expenseTransactions.length,
      trend: expensePercentage,
    },
  };

  return transactionsData;
}

export async function getSyrPageFollowers() {
  const page = await db.query.trackedProfiles.findFirst({
    with: {
      followerRecords: {
        orderBy: (followerRecords, { desc }) => [
          desc(followerRecords.recordDate),
        ],
        limit: 1,
      },
    },
    where: eq(trackedProfiles.name, "سوريانا التعليمية"),
  });

  const followers =
    page?.followerRecords && page?.followerRecords.length > 0
      ? { ...page.followerRecords[0], isInit: false }
      : FOLLOWERS;

  return followers;
}

export async function getPagesWithFollowers() {
  await requireAuth();

  const pages = await db.query.trackedProfiles.findMany({
    orderBy: (trackedProfiles, { asc }) => [asc(trackedProfiles.id)],
    with: {
      followerRecords: {
        orderBy: (followerRecords, { desc }) => [
          desc(followerRecords.recordDate),
        ],
        limit: 2,
      },
    },
  });

  const pagesWithFollowers = pages.map((page) => {
    if (page.followerRecords.length === 0) {
      return {
        ...page,
        trends: {
          facebook: 0,
          instagram: 0,
          telegram: 0,
        },
        followers: {
          facebook: 0,
          instagram: 0,
          telegram: 0,
        },
        recordDate: new Date(),
      };
    }
    const prevfacebookCount =
      (page.followerRecords[1] && page.followerRecords[1].facebookCount) || 0;
    const previnstagramCount =
      (page.followerRecords[1] && page.followerRecords[1].instagramCount) || 0;
    const prevtelegramCount =
      (page.followerRecords[1] && page.followerRecords[1].telegramCount) || 0;

    const facebookCount =
      (page.followerRecords[0] && page.followerRecords[0].facebookCount) || 0;
    const instagramCount =
      (page.followerRecords[0] && page.followerRecords[0].instagramCount) || 0;
    const telegramCount =
      (page.followerRecords[0] && page.followerRecords[0].telegramCount) || 0;

    const facebookTrend = facebookCount - prevfacebookCount;
    const instagramTrend = instagramCount - previnstagramCount;
    const telegramTrend = telegramCount - prevtelegramCount;

    return {
      ...page,
      trends: {
        facebook: facebookTrend,
        instagram: instagramTrend,
        telegram: telegramTrend,
      },
      followers: {
        facebook: facebookCount,
        instagram: instagramCount,
        telegram: telegramCount,
      },
      recordDate: page.followerRecords[0].recordDate,
    };
  });

  return pagesWithFollowers;
}

export async function getPageDetailsById(id: number) {
  await requireAuth();

  const pageData = await db.query.trackedProfiles.findFirst({
    where: (trackedProfiles, { eq }) => eq(trackedProfiles.id, id),
  });

  if (!pageData) {
    notFound();
  }

  return pageData;
}

export async function getPageWithStatsById(id: number) {
  await requireAuth();

  const pageData = await db.query.trackedProfiles.findFirst({
    where: (trackedProfiles, { eq }) => eq(trackedProfiles.id, id),
    with: {
      followerRecords: {
        orderBy: (followerRecords, { desc }) => [
          desc(followerRecords.recordDate),
        ],
      },
    },
  });

  if (!pageData) {
    notFound();
  }

  return pageData;
}
