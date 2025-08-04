import { getClientsWithStats } from "@/db/queries";
import { ClientCard, ClientsHeader } from "@/components/dashboard/clients";
import { Card } from "@/components/ui/card";

export default async function ClientsPage() {
  const clients = await getClientsWithStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <ClientsHeader />

      {/* Client Cards */}
      {clients.length === 0 ? (
        <Card className="text-center px-2">لا يوجد جهات إعلانية</Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => {
            return <ClientCard client={client} key={client.id} />;
          })}
        </div>
      )}
    </div>
  );
}
