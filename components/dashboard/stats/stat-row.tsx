"use client";
import { useState, useTransition } from "react";
import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteStatAction } from "@/actions/stats/delete-stat";
import { updateStatsAction } from "@/actions/stats/update-stat";

import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import { TableCell, TableRow } from "@/components/ui/table";
import { StatsForm } from "@/components/forms/stats-form";

import { ActivePlatforms, FollowerRecordSelect } from "@/types";

type Props = {
  stat: FollowerRecordSelect;
  activePlatforms: ActivePlatforms;
};

export function StatRow({ stat, activePlatforms }: Props) {
  const initialData = {
    recordDate: stat.recordDate,
    facebookCount: stat.facebookCount,
    instagramCount: stat.instagramCount,
    telegramCount: stat.telegramCount,
  };
  const [isPending, startTransition] = useTransition();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleDeleteStat = () => {
    startTransition(async () => {
      await deleteStatAction(stat.id, stat.profileId)
        .then(() => toast("تم حذف الحملة بنجاح"))
        .catch(() => toast.error("حدث خطأ أثناء الحذف"))
        .finally(() => setOpenDeleteModal(false));
    });
  };
  return (
    <TableRow key={stat.id} className="border-accent hover:bg-accent/30">
      <TableCell>
        <Badge>{format(stat.recordDate, "dd/MM/yyyy")}</Badge>
      </TableCell>
      {activePlatforms.hasFacebook && (
        <TableCell className="text-slate-300">
          {stat.facebookCount?.toLocaleString()}
        </TableCell>
      )}
      {activePlatforms.hasTelegram && (
        <TableCell className="text-slate-300">
          {stat.telegramCount?.toLocaleString()}
        </TableCell>
      )}
      {activePlatforms.hasInstagram && (
        <TableCell className="text-slate-300">
          {stat.instagramCount?.toLocaleString()}
        </TableCell>
      )}

      <TableCell className="flex items-center justify-center">
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
          <StatsForm
            buttonLabel="تعديل"
            onSubmit={updateStatsAction}
            setOpenModal={setOpenUpdateModal}
            statsId={stat.id}
            initialData={initialData}
            activePlatforms={activePlatforms}
            pageId={stat.profileId}
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
          <h3 className="text-xl md:text-2xl py-5">
            هل أنت متأكد من حذف هذه الإحصائية
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
              onClick={() => handleDeleteStat()}
              variant="destructive"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : "حذف"}
            </Button>
          </div>
        </Modal>
      </TableCell>
    </TableRow>
  );
}
