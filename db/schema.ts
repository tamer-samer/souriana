import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  varchar,
  serial,
  numeric,
  boolean,
  integer,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["admin", "partner", "user"]);
export const platform = pgEnum("platform", [
  "facebook",
  "instagram",
  "telegram",
]);
export const transactionType = pgEnum("transaction_type", [
  "income",
  "expense",
]);
export const transactionStatus = pgEnum("transaction_status", [
  "completed",
  "pending",
]);
export const campaignStatus = pgEnum("campaign_status", ["active", "ended"]);

// Tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerk_id").unique().notNull(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }).notNull().unique(),
  imageUrl: text("image_url"),
  role: userRole("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  imageUrl: text("image_url"),
  display: boolean("display").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  clientId: integer("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),
  status: campaignStatus("status").default("active").notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  isLimited: boolean("is_limited").default(false).notNull(),
  facebookLimit: integer("facebook_limit").default(0),
  instagramLimit: integer("instagram_limit").default(0),
  telegramLimit: integer("telegram_limit").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const ads = pgTable("ads", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),
  platform: platform("platform").notNull(),
  publishDate: timestamp("publish_date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const transactions = pgTable(
  "transactions",
  {
    id: serial("id").primaryKey(),

    type: transactionType("type").notNull(),
    amount: integer("amount").notNull(),
    status: transactionStatus("status").default("completed").notNull(),
    date: timestamp("date").defaultNow().notNull(),
    paymentMethod: varchar("payment_method", { length: 100 }).notNull(),

    recipientId: varchar("recipient_id")
      .notNull()
      .references(() => users.clerkId),

    clientId: integer("client_id").references(() => clients.id),

    expensePayeeName: text("expense_payee_name"),

    archiveId: integer("archive_id").references(() => transactionsArchive.id, {
      onDelete: "cascade",
    }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return [
      index("recipient_idx").on(table.recipientId),
      index("client_idx").on(table.clientId),
      index("status_idx").on(table.status),
      index("archive_idx").on(table.archiveId),
    ];
  }
);

export const transactionsArchive = pgTable("transactions_archive", {
  id: serial("id").primaryKey(),
  date: timestamp("date").defaultNow().notNull(),
  archivedByUserId: text("archived_by_user_id")
    .notNull()
    .references(() => users.clerkId),

  totalIncome: text("total_income").notNull(),
  totalExpense: text("total_expense").notNull(),
  netProfit: text("net_profit").notNull(),
});

export const trackedProfiles = pgTable("tracked_profiles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  imageUrl: text("image_url"),
  facebookUrl: text("facebook_url"),
  instagramUrl: text("instagram_url"),
  telegramUrl: text("telegram_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const followerRecords = pgTable(
  "follower_records",
  {
    id: serial("id").primaryKey(),
    profileId: integer("profile_id")
      .notNull()
      .references(() => trackedProfiles.id, { onDelete: "cascade" }),
    recordDate: timestamp("record_date").defaultNow().notNull(),

    facebookCount: integer("facebook_count"),
    instagramCount: integer("instagram_count"),
    telegramCount: integer("telegram_count"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return [index("profile_id_idx").on(table.profileId)];
  }
);

// Relations

export const usersRelations = relations(users, ({ many }) => ({
  transactions: many(transactions),
}));

export const clientsRelations = relations(clients, ({ many }) => ({
  campaigns: many(campaigns),
  transactions: many(transactions),
}));

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  ads: many(ads),
  client: one(clients, {
    fields: [campaigns.clientId],
    references: [clients.id],
  }),
}));

export const adsRelations = relations(ads, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [ads.campaignId],
    references: [campaigns.id],
  }),
}));

export const transactionsArchiveRelations = relations(
  transactionsArchive,
  ({ one, many }) => ({
    archivedByUser: one(users, {
      fields: [transactionsArchive.archivedByUserId],
      references: [users.clerkId],
    }),
    transactions: many(transactions),
  })
);

export const transactionsRelations = relations(transactions, ({ one }) => ({
  recipient: one(users, {
    fields: [transactions.recipientId],
    references: [users.clerkId],
  }),

  client: one(clients, {
    fields: [transactions.clientId],
    references: [clients.id],
  }),

  archive: one(transactionsArchive, {
    fields: [transactions.archiveId],
    references: [transactionsArchive.id],
  }),
}));

export const trackedProfilesRelations = relations(
  trackedProfiles,
  ({ many }) => ({
    followerRecords: many(followerRecords),
  })
);

export const followerRecordsRelations = relations(
  followerRecords,
  ({ one }) => ({
    profile: one(trackedProfiles, {
      fields: [followerRecords.profileId],
      references: [trackedProfiles.id],
    }),
  })
);
