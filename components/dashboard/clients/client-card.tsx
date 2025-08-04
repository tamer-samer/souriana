"use client";
import { deleteClientAction } from "@/actions/client/delete-client";
import { updateClientAction } from "@/actions/client/update-client";
import { ClientForm } from "@/components/forms/client-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/Spinner";
import { ClientSelect } from "@/types";
import { BarChart3, Building2, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  client: ClientSelect & {
    status: "Active" | "Ended";
    campaignCounts: number;
    totalAds: number;
  };
};

export function ClientCard({ client }: Props) {
  const [isPending, startTransition] = useTransition();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deleteClientAction(id)
        .then(() => toast("تم حذف الجهة بنجاح"))
        .catch(() => toast.error("حدث خطأ أثناء الحذف"))
        .finally(() => setOpenDeleteModal(false));
    });
  };

  return (
    <Card
      key={client.id}
      className="bg-secondary/50 border-accent hover:bg-secondary/70 transition-all duration-200 group cursor-pointer"
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src={client.imageUrl || "/placeholder.svg"}
                alt={client.name}
                width={20}
                height={20}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                {client.name}
              </h3>
              {client.campaignCounts > 0 && (
                <Badge
                  variant="secondary"
                  className={
                    client.status === "Active"
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                  }
                >
                  {client.status === "Active" ? "نشطة" : "منتهية"}
                </Badge>
              )}
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
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
              <ClientForm
                onSubmit={(values) => updateClientAction(client.id, values)}
                buttonLabel="تعديل"
                initialData={{
                  name: client.name,
                  imageUrl: client?.imageUrl || undefined,
                }}
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
                هل أنت متأكد من حذف هذه الجهة؟
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
                  onClick={() => handleDelete(client.id)}
                  variant="destructive"
                  disabled={isPending}
                >
                  {isPending ? <Spinner /> : "حذف"}
                </Button>
              </div>
            </Modal>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-400">
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm">عدد الحملات</span>
            </div>
            <span className="text-white font-medium">
              {client.campaignCounts}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-400">
              <Building2 className="h-4 w-4" />
              <span className="text-sm">الإعلانات المنشورة</span>
            </div>
            <span className="text-white font-medium">{client.totalAds}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-accent">
          <Link href={`/clients/${client.id}`}>
            <Button variant="outline" className="w-full">
              التفاصيل
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
