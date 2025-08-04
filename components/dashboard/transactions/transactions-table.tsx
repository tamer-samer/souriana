"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import { Archive, Filter } from "lucide-react";
import { toast } from "sonner";
import { getTransactions } from "@/db/queries";
import { cn } from "@/lib/utils";
import { archiveTransactions } from "@/actions/transactions/archive-transactions";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "@/components/ui/Spinner";
import { Modal } from "@/components/ui/modal";
import { TransactionsActions } from "./transactions-table-actions";

import { ClientSelect, TransactionsSummary, UserSelect } from "@/types";

type Props = {
  transactions: Awaited<ReturnType<typeof getTransactions>>;
  users: UserSelect[];
  clients: ClientSelect[];
  transactionsSummary: TransactionsSummary;
};
export function TransactionsTable({
  transactions,
  users,
  clients,
  transactionsSummary,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const paymentMethods = [
    ...new Set(transactions.data.map((t) => t.paymentMethod)),
  ];

  const [openArchiveModal, setOpenArchiveModal] = useState(false);
  const [filter, setFilter] = useState(false);
  const [filterUser, setFilterUser] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterClient, setFilterClient] = useState<"all" | number>("all");
  const [filterPayMethod, setFilterPayMethod] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredTransactions = transactions.data.filter((t) => {
    return (
      (filterUser === "all" || t.recipientId === filterUser) &&
      (filterType === "all" || t.type === filterType) &&
      (filterClient === "all" || t.clientId === filterClient) &&
      (filterPayMethod === "all" || t.paymentMethod === filterPayMethod) &&
      (filterStatus === "all" || t.status === filterStatus)
    );
  });

  const handleArchive = () => {
    startTransition(() => {
      archiveTransactions(transactionsSummary).then((res) => {
        if (res?.success) {
          toast("تمت الأرشفة بنجاح");
        } else {
          toast.error("حدث خطأ ما!");
        }
      });
    });
  };
  return (
    <Card className="bg-secondary/50 border-accent mt-10">
      <CardHeader className="border-b border-accent">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">آخر المعاملات</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={filter ? "default" : "ghost"}
              size="sm"
              className="gap-2"
              onClick={() => {
                if (filter) {
                  setFilterUser("all");
                  setFilterType("all");
                  setFilterClient("all");
                  setFilterPayMethod("all");
                  setFilterStatus("all");
                }
                setFilter(!filter);
              }}
            >
              <Filter className="h-4 w-4" />
            </Button>

            <Modal
              open={openArchiveModal}
              setOpen={setOpenArchiveModal}
              trigger={
                <Button
                  variant={"ghost"}
                  size="sm"
                  className="gap-2"
                  disabled={isPending}
                >
                  {isPending ? <Spinner /> : <Archive className="h-4 w-4" />}
                </Button>
              }
            >
              <h3 className="text-xl md:text-2xl text-center py-5">
                هل أنت متأكد من أرشفة الحوالات
              </h3>
              <div className="flex items-center justify-end gap-2">
                <Button
                  onClick={() => setOpenArchiveModal(false)}
                  variant="ghost"
                  disabled={isPending}
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleArchive}
                  variant="destructive"
                  disabled={isPending}
                >
                  {isPending ? <Spinner /> : "أرشفة"}
                </Button>
              </div>
            </Modal>
          </div>
        </div>

        {/* Filters */}
        {filter && (
          <div className="flex flex-wrap gap-4 mt-4">
            <Select value={filterUser} onValueChange={setFilterUser}>
              <SelectTrigger className="md:w-40 bg-accent border-slate-700 text-white">
                <SelectValue placeholder="Partner" />
              </SelectTrigger>
              <SelectContent className="bg-accent border-slate-700">
                <SelectItem value="all">المستخدمين</SelectItem>
                {users.map((user) => (
                  <SelectItem key={user.clerkId} value={user.clerkId}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="md:w-40 bg-accent border-slate-700 text-white">
                <SelectValue placeholder="Client" />
              </SelectTrigger>
              <SelectContent className="bg-accent border-slate-700">
                <SelectItem value="all">النوع</SelectItem>
                <SelectItem value="income">استلام</SelectItem>
                <SelectItem value="expense">دفع</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filterClient.toString()}
              onValueChange={(v) => {
                if (v === "all") {
                  setFilterClient("all");
                } else {
                  setFilterClient(Number(v));
                }
              }}
            >
              <SelectTrigger className="md:w-40 bg-accent border-slate-700 text-white">
                <SelectValue placeholder="Client" />
              </SelectTrigger>
              <SelectContent className="bg-accent border-slate-700">
                <SelectItem value="all">العملاء</SelectItem>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id.toString()}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterPayMethod} onValueChange={setFilterPayMethod}>
              <SelectTrigger className="md:w-40 bg-accent border-slate-700 text-white">
                <SelectValue placeholder="Client" />
              </SelectTrigger>
              <SelectContent className="bg-accent border-slate-700">
                <SelectItem value="all">طريقة الدفع</SelectItem>
                {paymentMethods.map((pay) => (
                  <SelectItem key={pay} value={pay}>
                    {pay}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="md:w-40 bg-accent border-slate-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-accent border-slate-700">
                <SelectItem value="all">الحالة</SelectItem>
                <SelectItem value="completed">مكتمل</SelectItem>
                <SelectItem value="pending">في الانتظار</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-slate-800/50">
              <TableHead className="text-slate-300">العميل</TableHead>
              <TableHead className="text-slate-300">النوع</TableHead>
              <TableHead className="text-slate-300">المبلغ</TableHead>
              <TableHead className="text-slate-300">التاريخ</TableHead>
              <TableHead className="text-slate-300">طريقة الدفع</TableHead>
              <TableHead className="text-slate-300">الحالة</TableHead>
              <TableHead className="text-slate-300">المستخدم</TableHead>
              <TableHead className="text-slate-300">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="pt-10 pb-4">
                  لا يوجد بيانات لعرضها
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="border-slate-800 hover:bg-slate-800/30"
                >
                  <TableCell className="text-slate-300">
                    {transaction.type === "income"
                      ? transaction.client?.name
                      : transaction.expensePayeeName}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        transaction.type === "income" ? "default" : "secondary"
                      }
                      className={cn(
                        "min-w-[55px]",
                        transaction.type === "income"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      )}
                    >
                      {transaction.type === "income" ? "استلام" : "دفع"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-white font-medium">
                    {transaction.amount.toLocaleString()}
                  </TableCell>

                  <TableCell className="text-slate-300">
                    {format(transaction.date, "dd/MM/yyyy")}
                  </TableCell>

                  <TableCell className="text-slate-300">
                    {transaction.paymentMethod}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "completed"
                          ? "default"
                          : "secondary"
                      }
                      className={cn(
                        "min-w-[70px]",
                        transaction.status === "completed"
                          ? "bg-teal-500/20 text-teal-400 border-teal-500/30"
                          : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      )}
                    >
                      {transaction.status === "pending"
                        ? "في الانتظار"
                        : "مكتمل"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {transaction.recipient.name}
                  </TableCell>

                  <TableCell>
                    <TransactionsActions
                      transaction={transaction}
                      users={users}
                      clients={clients}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
