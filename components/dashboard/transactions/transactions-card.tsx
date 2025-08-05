import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserTransactionsSummary } from "@/types";

type Props = {
  title: string;
  value: number;
  transactionCounts?: number;
  icon: LucideIcon;
  trendValue?: number;
  className?: string;
  userTransactionsSummary?: UserTransactionsSummary[];
};

export function TransactionsCard({
  title,
  value,
  transactionCounts,
  icon: Icon,
  trendValue,
  className,
  userTransactionsSummary,
}: Props) {
  return (
    <Card
      className={cn(
        "bg-slate-900/50 border-accent hover:bg-slate-900/70 transition-colors w-full max-w-[550px] mx-auto",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <div className="flex items-center gap-2">
              <p
                style={{ direction: "ltr" }}
                className="text-2xl font-bold text-white"
              >
                {Math.round(value).toLocaleString()}
              </p>
              {trendValue !== undefined &&
                !isNaN(trendValue) &&
                trendValue !== 0 && (
                  <span
                    style={{ direction: "ltr" }}
                    className={cn(
                      "text-xs font-medium",
                      trendValue >= 0 ? "text-emerald-400" : "text-red-400"
                    )}
                  >
                    {Math.round(trendValue)}%
                  </span>
                )}
            </div>
            {transactionCounts && (
              <p className="text-xs text-slate-500 mt-1">
                عدد المعاملات: {transactionCounts}
              </p>
            )}
          </div>
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
              <Icon className="h-6 w-6 text-teal-400" />
            </div>
          </div>
        </div>

        {/* Users Transactions Table */}
        {userTransactionsSummary && (
          <Table className="mt-3">
            <TableHeader>
              <TableRow className="border-accent hover:bg-accent/50">
                <TableHead className="text-slate-300">الاسم</TableHead>
                <TableHead className="text-slate-300">استلم</TableHead>
                <TableHead className="text-slate-300">دفع</TableHead>
                <TableHead className="text-slate-300">الصافي</TableHead>
                <TableHead className="text-slate-300">له / عليه</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userTransactionsSummary.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="pt-10 pb-4">
                    لا يوجد بيانات لعرضها
                  </TableCell>
                </TableRow>
              ) : (
                userTransactionsSummary.map((user) => (
                  <TableRow
                    style={{ direction: "ltr" }}
                    key={user.name}
                    className="border-accent hover:bg-accent/30 py-2"
                  >
                    <TableCell className="text-slate-300 p-4">
                      {user.name}
                    </TableCell>

                    <TableCell className="text-slate-300">
                      <span className="relative">
                        {user.income.toLocaleString()}
                        {user.incomeCounts > 0 && (
                          <div className="text-xs border border-primary rounded-md w-4 h-4 inline-block ml-2 absolute -right-2 -top-2.5 z-2 text-primary">
                            {user.incomeCounts}
                          </div>
                        )}
                      </span>
                    </TableCell>

                    <TableCell className="text-slate-300">
                      <span className="relative">
                        {user.expense.toLocaleString()}
                        {user.expenseCounts > 0 && (
                          <div className="text-xs border border-rose-400 rounded-md w-4 h-4 inline-block ml-2 absolute -right-2 -top-2.5 z-2 text-rose-400">
                            {user.expenseCounts}
                          </div>
                        )}
                      </span>
                    </TableCell>

                    <TableCell className="text-slate-300">
                      {user.net.toLocaleString()}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={user.isMustPay ? "default" : "secondary"}
                        className={cn(
                          "min-w-[70px]",
                          !user.isMustPay
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        )}
                      >
                        {user.isMustPay
                          ? Math.round(user.moenyToPay).toLocaleString()
                          : Math.abs(
                              Math.round(user.moenyToPay)
                            ).toLocaleString()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
