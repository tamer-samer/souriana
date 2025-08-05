"use client";
import { useState } from "react";

import { createClientAction } from "@/actions/client/create-client";
import { ClientForm } from "@/components/forms/client-form";
import { Modal } from "@/components/ui/modal";
import { PageTitle, AddButton } from "@/components/common";

export function ClientsHeader() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <PageTitle title="الجهات الإعلانية" />

      <Modal
        trigger={<AddButton title="جهة" />}
        open={openCreateModal}
        setOpen={setOpenCreateModal}
      >
        <ClientForm
          buttonLabel="إضافة"
          setOpenModal={setOpenCreateModal}
          onSubmit={createClientAction}
        />
      </Modal>
    </div>
  );
}
