import { notFound } from "next/navigation";
import { getPageWithStatsById } from "@/db/queries";
import { PageHeader } from "@/components/dashboard/pages";
import { StatsTable } from "@/components/dashboard/stats";
import { Card } from "@/components/ui/card";

type Params = {
  params: Promise<{ profileId: string }>;
};
export default async function ProfilePage({ params }: Params) {
  const profileId = (await params).profileId;
  const pageId = Number(profileId);
  if (isNaN(pageId)) {
    return notFound();
  }

  const page = await getPageWithStatsById(pageId);

  const activePlatforms = {
    hasFacebook: !!page.facebookUrl,
    hasInstagram: !!page.instagramUrl,
    hasTelegram: !!page.telegramUrl,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        name={page.name}
        imageUrl={page.imageUrl}
        pageId={pageId}
        activePlatforms={activePlatforms}
      />

      {page.followerRecords.length === 0 ? (
        <Card className="text-center px-2">لا يوجد إحصائيات</Card>
      ) : (
        <StatsTable
          stats={page.followerRecords}
          activePlatforms={activePlatforms}
        />
      )}
    </div>
  );
}
