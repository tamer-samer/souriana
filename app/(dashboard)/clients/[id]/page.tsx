import { notFound } from "next/navigation";
import { getClientDetailsById } from "@/db/queries";
import { CampaignCard, ClientHeader } from "@/components/dashboard/clients";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ClientDetailsPage({ params }: Props) {
  const id = (await params).id;
  const clientId = Number(id);
  if (isNaN(clientId)) {
    return notFound();
  }
  const client = await getClientDetailsById(clientId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <ClientHeader
        name={client.name}
        imageUrl={client.imageUrl}
        clientId={clientId}
      />

      {client.campaigns.length <= 0 && (
        <Card>
          <CardContent>
            <div className="text-center text-lg md:text-xl">
              لا يوجد حملات إعلانية
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campaigns */}
      <div className="space-y-6">
        {client.campaigns.map((campaign) => {
          return <CampaignCard key={campaign.id} campaign={campaign} />;
        })}
      </div>
    </div>
  );
}
