"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

import { createClientAction } from "@/actions/client/create-client";
import { ClientForm } from "@/components/forms/client-form";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

export function ClientsHeader() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">الجهات الإعلانية</h1>
      </div>

      <Modal
        trigger={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة جهة
          </Button>
        }
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
