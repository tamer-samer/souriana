import { getPagesWithFollowers } from "@/db/queries";
import { PageCard } from "@/components/dashboard/pages/page-card";
import { StatsHeader, StatsComparison } from "@/components/dashboard/stats";
import { Card } from "@/components/ui/card";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => {
            return <PageCard key={page.id} page={page} />;
          })}
        </div>
      )}

      {pages.length > 0 && <StatsComparison pages={pages} />}
    </div>
  );
}
