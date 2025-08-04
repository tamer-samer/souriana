import {
  TransactionsHeader,
  TransactionsAnalytics,
  TransactionsTable,
} from "@/components/dashboard/transactions";
import { Card } from "@/components/ui/card";
import { getClients, getTransactions, getUsers } from "@/db/queries";

export default async function TransactionsPage() {
  const usersData = getUsers();
  const clientsData = getClients();
  const transactionsData = getTransactions();

  const [users, clients, transactions] = await Promise.all([
    usersData,
    clientsData,
    transactionsData,
  ]);

  const partners = users.filter(
    (user) => user.role === "admin" || user.role === "partner"
  );

  const personIncome = transactions.netTransaction.amount / partners.length;

  const userTransactionsSummary = users.map((user) => {
    const userTransactions = transactions.data.filter(
      (t) => t.recipientId === user.clerkId
    );

    const userIncomeTransactions = userTransactions.filter(
      (userT) => userT.type === "income"
    );

    const userIncome = userIncomeTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const userExpenseTransactions = userTransactions.filter(
      (userT) => userT.type === "expense"
    );

    const userExpense = userExpenseTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const userTotalAmount = userIncome - userExpense;
    const moenyToPay = userTotalAmount - personIncome;

    return {
      name: user.name,
      income: userIncome,
      incomeCounts: userIncomeTransactions.length,
      expense: userExpense,
      expenseCounts: userExpenseTransactions.length,
      net: userTotalAmount,
      moenyToPay: moenyToPay,
      isMustPay: moenyToPay > 0,
    };
  });

  const transactionsSummary = {
    totalIncome: transactions.incomeTransactions.amount.toLocaleString(),
    totalExpense: transactions.expenseTransactions.amount.toLocaleString(),
    netProfit: transactions.netTransaction.amount.toLocaleString(),
  };

  return (
    <div>
      <TransactionsHeader users={users} clients={clients} />
      {transactions.data.length === 0 ? (
        <Card className="text-center px-2 mt-6">لا يوجد بيانات لعرضها</Card>
      ) : (
        <>
          <TransactionsAnalytics
            netTransaction={transactions.netTransaction}
            incomeTransactions={transactions.incomeTransactions}
            expenseTransactions={transactions.expenseTransactions}
            personIncome={personIncome}
            userTransactionsSummary={userTransactionsSummary}
          />
          <TransactionsTable
            transactions={transactions}
            users={users}
            clients={clients}
            transactionsSummary={transactionsSummary}
          />
        </>
      )}
    </div>
  );
}
