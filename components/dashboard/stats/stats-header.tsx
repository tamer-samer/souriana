"use client";
import { createPageAction } from "@/actions/page/create-page";
import { PageForm } from "@/components/forms/page-form";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Plus } from "lucide-react";
import { useState } from "react";

export function StatsHeader() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">الصفحات</h1>
      </div>

      <Modal
        trigger={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة صفحة
          </Button>
        }
        open={openCreateModal}
        setOpen={setOpenCreateModal}
      >
        <PageForm
          buttonLabel="إضافة"
          setOpenModal={setOpenCreateModal}
          onSubmit={createPageAction}
        />
      </Modal>
    </div>
  );
}
