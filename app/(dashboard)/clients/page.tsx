import { getClientsWithStats } from "@/db/queries";
import { ClientCard, ClientsHeader } from "@/components/dashboard/clients";
import { Card } from "@/components/ui/card";
import { CardsContainer } from "@/components/common";

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
        <CardsContainer>
          {clients.map((client) => {
            return <ClientCard client={client} key={client.id} />;
          })}
        </CardsContainer>
      )}
    </div>
  );
}
