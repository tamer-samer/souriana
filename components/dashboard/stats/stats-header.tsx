"use client";
import { createPageAction } from "@/actions/page/create-page";
import { PageTitle, AddButton } from "@/components/common";
import { PageForm } from "@/components/forms/page-form";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";

export function StatsHeader() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <PageTitle title="الصفحات" />

      <Modal
        trigger={<AddButton title="صفحة" />}
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
