import { isEqual } from "date-fns";
import { Edit, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteAdAction } from "@/actions/ads/delete-ad";
import { updateAdAction } from "@/actions/ads/update-ad";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/Spinner";
import { handleDelete } from "@/lib/utils";
import { DeleteAdValues } from "@/types";

type Props = {
  ad: {
    platform: "facebook" | "instagram" | "telegram";
    id: number;
    createdAt: Date;
    campaignId: number;
    publishDate: Date;
  };
  clientId: number;
  index: number;
};
export function AdCard({ ad, clientId, index }: Props) {
  const [isPending, startTransition] = useTransition();

  const [adDate, setAdDate] = useState<Date | undefined>(ad.publishDate);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleUpdateAd = (id: number) => {
    if (adDate === undefined) {
      toast.error("يجب إدخال تاريخ!");
      return;
    }

    if (isEqual(adDate, ad.publishDate)) {
      setOpenUpdateModal(false);
      return;
    }

    startTransition(async () => {
      await updateAdAction(id, {
        clientId,
        publishDate: adDate,
      })
        .then(() => toast("تم تعديل الإعلان بنجاح"))
        .catch(() => toast.error("حدث خطأ أثناء التعديل"))
        .finally(() => setOpenUpdateModal(false));
    });
  };

  return (
    <div
      key={ad.id}
      className="flex items-center justify-between py-2 px-3 bg-secondary/50 rounded"
    >
      <span className="text-sm text-slate-300">Ad #{index + 1}</span>
      <Badge className="text-slate-200 text-sm">
        {ad.publishDate.toLocaleString("ar", {
          year: "numeric",
          month: "2-digit",
          day: "numeric",
          timeZone: "UTC",
        })}
      </Badge>
      <div className="flex space-x-1">
        {/* Update Modal */}
        <Modal
          open={openUpdateModal}
          setOpen={setOpenUpdateModal}
          key={ad.id}
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
          <DatePicker value={adDate} setValue={setAdDate} className="w-full" />
          <Button disabled={isPending} onClick={() => handleUpdateAd(ad.id)}>
            {isPending ? <Spinner /> : "تعديل"}
          </Button>
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
            هل أنت متأكد من حذف هذه الإعلان؟
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
              onClick={() =>
                handleDelete<DeleteAdValues>({
                  startTransition,
                  setOpenDeleteModal,
                  deleteAction: deleteAdAction,
                  data: { id: ad.id, clientId },
                })
              }
              variant="destructive"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : "حذف"}
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
