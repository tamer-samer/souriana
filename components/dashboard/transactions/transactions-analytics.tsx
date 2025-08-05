import { DollarSign, TrendingDown, TrendingUp, Users } from "lucide-react";
import { TransactionsCard } from "./transactions-card";
import { TransactionAnalytics } from "@/types";
import { CardsContainer } from "@/components/common";

type Props = TransactionAnalytics;
export function TransactionsAnalytics({
  netTransaction,
  incomeTransactions,
  expenseTransactions,
  personIncome,
  userTransactionsSummary,
}: Props) {
  return (
    <div className="mt-10">
      <CardsContainer>
        <TransactionsCard
          title="صافي الدخل"
          value={netTransaction.amount}
          icon={DollarSign}
          transactionCounts={netTransaction.counts}
          trendValue={netTransaction.trend}
        />
        <TransactionsCard
          title="إجمالي الدخل"
          value={incomeTransactions.amount}
          transactionCounts={incomeTransactions.counts}
          icon={TrendingUp}
          trendValue={incomeTransactions.trend}
        />
        <TransactionsCard
          title="إجمالي الدفع"
          value={expenseTransactions.amount}
          transactionCounts={expenseTransactions.counts}
          icon={TrendingDown}
          trendValue={expenseTransactions.trend}
        />
      </CardsContainer>

      <div className="max-w-[550px] mt-6 mx-auto">
        <TransactionsCard
          title="حصة الشخص"
          value={personIncome}
          icon={Users}
          userTransactionsSummary={userTransactionsSummary}
        />
      </div>
    </div>
  );
}
