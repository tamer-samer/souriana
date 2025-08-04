"use client";
import { createTransactionAction } from "@/actions/transactions/create-transactions";
import { TransactionsForm } from "@/components/forms/transactions-form";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { clients, users } from "@/db/schema";
import { Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  users: (typeof users.$inferSelect)[];
  clients: (typeof clients.$inferSelect)[];
};

export function TransactionsHeader({ users, clients }: Props) {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">الفواتير</h1>
      </div>

      <Modal
        trigger={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة فاتورة
          </Button>
        }
        open={openCreateModal}
        setOpen={setOpenCreateModal}
      >
        <TransactionsForm
          buttonLabel="إضافة"
          setOpenModal={setOpenCreateModal}
          onSubmit={createTransactionAction}
          users={users}
          clients={clients}
        />
      </Modal>
    </div>
  );
}
