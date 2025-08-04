"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Edit, Trash2 } from "lucide-react";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { LiaTelegram } from "react-icons/lia";
import { toast } from "sonner";

import { deletePageAction } from "@/actions/page/delete-page";
import { updatePageAction } from "@/actions/page/update-page";

import { PageForm } from "@/components/forms/page-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/Spinner";

import { TrackedProfileSelect } from "@/types";

type Props = {
  page: TrackedProfileSelect;
};
export function PageCard({ page }: Props) {
  const initialData = {
    name: page.name,
    imageUrl: page?.imageUrl || undefined,
    facebookUrl: page?.facebookUrl || undefined,
    instagramUrl: page?.instagramUrl || undefined,
    telegramUrl: page?.telegramUrl || undefined,
  };

  const [isPending, startTransition] = useTransition();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deletePageAction(id)
        .then(() => toast("تم حذف الصفحة بنجاح"))
        .catch(() => toast.error("حدث خطأ أثناء الحذف"))
        .finally(() => setOpenDeleteModal(false));
    });
  };
  return (
    <Card
      key={page.id}
      className="bg-secondary/50 border-accent group hover:bg-secondary/70 transition-colors"
    >
      <CardHeader className="pb-3 flex justify-between items-center">
        <Link
          href={`/stats/${page.id}`}
          className="flex items-center space-x-3 flex-1"
        >
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={page.imageUrl || "/placeholder.svg"}
              alt={page.name}
            />
            <AvatarFallback className="bg-teal-500 text-white">
              {page.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-white text-lg">{page.name}</CardTitle>
        </Link>
        <div className="opacity-100 group-hover:opacity-100 transition-opacity flex space-x-0.5">
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
            <PageForm
              onSubmit={(values) => updatePageAction(page.id, values)}
              buttonLabel="تعديل"
              initialData={initialData}
              setOpenModal={setOpenUpdateModal}
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
              هل أنت متأكد من حذف هذه الصفحة؟
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
                onClick={() => handleDelete(page.id)}
                variant="destructive"
                disabled={isPending}
              >
                {isPending ? <Spinner /> : "حذف"}
              </Button>
            </div>
          </Modal>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center space-x-2">
          {page.facebookUrl && (
            <a
              href={page.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
            >
              <FiFacebook className="h-4 w-4 text-blue-400" />
            </a>
          )}
          {page.instagramUrl && (
            <a
              href={page.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 transition-colors"
            >
              <FiInstagram className="h-4 w-4 text-pink-400" />
            </a>
          )}
          {page.telegramUrl && (
            <a
              href={page.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-colors"
            >
              <LiaTelegram className="h-4 w-4 text-cyan-400" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
