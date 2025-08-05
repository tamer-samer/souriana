import { getPagesWithFollowers } from "@/db/queries";
import { PageCard } from "@/components/dashboard/pages/page-card";
import { StatsHeader, StatsComparison } from "@/components/dashboard/stats";
import { Card } from "@/components/ui/card";
import { CardsContainer } from "@/components/common";

export default async function SatasPage() {
  const pages = await getPagesWithFollowers();

  return (
    <div className="space-y-6">
      {/* Header */}
      <StatsHeader />

      {/* Page Cards */}
      {pages.length === 0 ? (
        <Card className="text-center px-2">لا يوجد صفحات</Card>
      ) : (
        <CardsContainer>
          {pages.map((page) => {
            return <PageCard key={page.id} page={page} />;
          })}
        </CardsContainer>
      )}

      {pages.length > 0 && <StatsComparison pages={pages} />}
    </div>
  );
}
