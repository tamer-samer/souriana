"use client";
import { deleteTransactionAction } from "@/actions/transactions/delete-transactions";
import { updateTransactionAction } from "@/actions/transactions/update-transactions";
import { TransactionsForm } from "@/components/forms/transactions-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/Spinner";
import { getTransactions } from "@/db/queries";
import { clients, users } from "@/db/schema";
import { handleDelete } from "@/lib/utils";
import { DeleteTransactionValues } from "@/types";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

type GetTransactionsResult = Awaited<ReturnType<typeof getTransactions>>;

type TransactionsArray = GetTransactionsResult["data"];

type Transaction = TransactionsArray[number];

type Props = {
  transaction: Transaction;
  users: (typeof users.$inferSelect)[];
  clients: (typeof clients.$inferSelect)[];
};
export function TransactionsActions({ transaction, users, clients }: Props) {
  const initialData = {
    type: transaction.type,
    amount: transaction.amount,
    status: transaction.status,
    date: transaction.date,
    paymentMethod: transaction.paymentMethod,
    recipientId: transaction.recipientId,
    expensePayeeName: transaction.expensePayeeName ?? undefined,
    clientId: transaction.clientId ?? undefined,
    newClient: "",
  };
  const [isPending, startTransition] = useTransition();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-slate-800 border-slate-700 flex flex-col"
        align="start"
        style={{ direction: "rtl" }}
      >
        {/* Update Modal */}
        <Modal
          open={openUpdateModal}
          setOpen={setOpenUpdateModal}
          trigger={
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
              }}
              className="text-slate-300 hover:bg-slate-700"
            >
              <Edit className="mr-2 h-4 w-4" />
              تعديل
            </DropdownMenuItem>
          }
        >
          <TransactionsForm
            buttonLabel="تعديل"
            setOpenModal={setOpenUpdateModal}
            onSubmit={updateTransactionAction}
            users={users}
            clients={clients}
            initialData={initialData}
            transactionId={transaction.id}
          />
        </Modal>

        {/* Delete Modal */}

        <Modal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          trigger={
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
              }}
              disabled={isPending}
              className="text-red-400 hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4 text-red-400 mr-2 hover:bg-red-500/20" />
              حذف
            </DropdownMenuItem>
          }
        >
          <h3 className="text-xl md:text-2xl text-center py-5">
            هل أنت متأكد من حذف هذه المعاملة
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
                handleDelete<DeleteTransactionValues>({
                  startTransition,
                  setOpenDeleteModal,
                  deleteAction: deleteTransactionAction,
                  data: { id: transaction.id },
                })
              }
              variant="destructive"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : "حذف"}
            </Button>
          </div>
        </Modal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
