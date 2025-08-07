import { getPagesWithFollowers } from "@/db/queries";
import { PageCard } from "@/components/dashboard/pages/page-card";
import { StatsHeader, StatsComparison } from "@/components/dashboard/stats";
import { Card } from "@/components/ui/card";
import { CardsContainer } from "@/components/common";
import { Platform } from "@/types";

export default async function SatasPage() {
  const pages = await getPagesWithFollowers();

  const platforms: Platform[] = ["facebook", "instagram", "telegram"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <StatsHeader />

      {/* Page Cards */}
      {pages.length === 0 ? (
        <Card className="text-center px-2">لا يوجد صفحات</Card>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-4">
          {pages.map((page) => {
            return <PageCard key={page.id} page={page} />;
          })}
        </div>
      )}

      {pages.length > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-4 mt-10">
          {platforms.map((platform, i) => {
            const pagesStats = pages.map((page) => {
              const currentStat = page.followers[platform];
              const trend = page.trends[platform];

              return {
                id: page.id,
                name: page.name,
                currentStat,
                trend: trend,
                currentDate: page.recordDate,
              };
            });

            return (
              <StatsComparison platformName={platform} pages={pagesStats} />
            );
          })}
        </div>
      )}
    </div>
  );
}
