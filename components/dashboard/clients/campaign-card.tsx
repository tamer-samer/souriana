"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlatformSection } from "./platform-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useState, useTransition } from "react";
import { deleteCampaignAction } from "@/actions/campaign/delete-campaign";
import { toast } from "sonner";
import Spinner from "@/components/ui/Spinner";
import { Modal } from "@/components/ui/modal";
import { CampaignForm } from "@/components/forms/campaign-form";
import { updateCampaignAction } from "@/actions/campaign/update-campaign";
import { CampaignWithPlatforms } from "@/types";

type Props = {
  campaign: CampaignWithPlatforms;
};
export function CampaignCard({ campaign }: Props) {
  const [isPending, startTransition] = useTransition();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleDeleteCampaign = () => {
    startTransition(async () => {
      await deleteCampaignAction(campaign.id, campaign.clientId)
        .then(() => toast("تم حذف الحملة بنجاح"))
        .catch(() => toast.error("حدث خطأ أثناء الحذف"))
        .finally(() => setOpenDeleteModal(false));
    });
  };

  const initCampaign = {
    ...campaign,
    facebookLimit: campaign.platforms.facebook.limit,
    instagramLimit: campaign.platforms.instagram.limit,
    telegramLimit: campaign.platforms.telegram.limit,
  };

  return (
    <Card key={campaign.id} className="bg-secondary/50 border-accent">
      <CardHeader className="border-b border-accent">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CardTitle className="text-white">{campaign.name}</CardTitle>
            <Badge
              variant="secondary"
              className={
                campaign.status === "active"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "bg-slate-500/20 text-slate-400 border-slate-500/30"
              }
            >
              {campaign.status === "active" ? "نشطة" : "منتهية"}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span
              style={{ direction: "ltr" }}
              className="text-sm text-slate-400"
            >
              {campaign.startDate &&
                `${format(campaign.startDate, "dd/MM/yyyy")}`}{" "}
              {campaign.endDate &&
                `- ${format(campaign.endDate, "dd/MM/yyyy")}`}
            </span>
            {
              <div className="flex space-x-1">
                {/* Update Modal */}
                <Modal
                  open={openUpdateModal}
                  setOpen={setOpenUpdateModal}
                  trigger={
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isPending}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  }
                >
                  <CampaignForm
                    initialData={initCampaign}
                    buttonLabel="تعديل"
                    onSubmit={updateCampaignAction}
                    setOpenModal={setOpenUpdateModal}
                    clientId={campaign.clientId}
                    campaignId={campaign.id}
                  />
                </Modal>

                {/* Delete Modal */}
                <Modal
                  open={openDeleteModal}
                  setOpen={setOpenDeleteModal}
                  trigger={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400 hover:text-red-300"
                      disabled={isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  }
                >
                  <h3 className="text-xl md:text-2xl text-center py-5">
                    هل أنت متأكد من حذف هذه الحملة
                  </h3>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={() => setOpenDeleteModal(false)}
                      variant="ghost"
                      disabled={isPending}
                    >
                      إلغاء
                    </Button>
                    <Button
                      onClick={() => handleDeleteCampaign()}
                      variant="destructive"
                      disabled={isPending}
                    >
                      {isPending ? <Spinner /> : "حذف"}
                    </Button>
                  </div>
                </Modal>
              </div>
            }
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PlatformSection
            campaignId={campaign.id}
            clientId={campaign.clientId}
            platform="facebook"
            data={campaign.platforms.facebook}
            color="text-blue-400"
            isActive={campaign.status === "active"}
          />
          <PlatformSection
            campaignId={campaign.id}
            clientId={campaign.clientId}
            platform="instagram"
            data={campaign.platforms.instagram}
            color="text-pink-400"
            isActive={campaign.status === "active"}
          />
          <PlatformSection
            campaignId={campaign.id}
            clientId={campaign.clientId}
            platform="telegram"
            data={campaign.platforms.telegram}
            color="text-cyan-400"
            isActive={campaign.status === "active"}
          />
        </div>
      </CardContent>
    </Card>
  );
}
