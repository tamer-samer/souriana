"use client";
import { createTransactionAction } from "@/actions/transactions/create-transactions";
import { PageTitle, AddButton } from "@/components/common";
import { TransactionsForm } from "@/components/forms/transactions-form";
import { Modal } from "@/components/ui/modal";
import { clients, users } from "@/db/schema";
import { useState } from "react";

type Props = {
  users: (typeof users.$inferSelect)[];
  clients: (typeof clients.$inferSelect)[];
};

export function TransactionsHeader({ users, clients }: Props) {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <PageTitle title="الفواتير" />

      <Modal
        trigger={<AddButton title="فاتورة" />}
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
