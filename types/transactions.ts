/**
 * Transactions related types
 */

export type TransactionType = "income" | "expense";
export type TransactionStatus = "completed" | "pending";

export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  date: Date;
  paymentMethod: string;
  recipientId: string;
  clientId?: number;
  expensePayeeName?: string;
  archiveId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionWithRelations extends Transaction {
  recipient: {
    clerkId: string;
    name?: string;
    email: string;
  };
  client?: {
    id: number;
    name: string;
  };
  archive?: TransactionArchive;
}

type TransactionCard = {
  amount: number;
  lastAmount: number;
  counts: number;
  trend: number;
};
export type UserTransactionsSummary = {
  name: string | null;
  income: number;
  incomeCounts: number;
  expense: number;
  expenseCounts: number;
  net: number;
  moenyToPay: number;
  isMustPay: boolean;
};
export interface TransactionAnalytics {
  netTransaction: TransactionCard;
  incomeTransactions: TransactionCard;
  expenseTransactions: TransactionCard;
  personIncome: number;
  userTransactionsSummary: UserTransactionsSummary[];
}
export interface TransactionFormData {
  type: TransactionType;
  amount: number;
  status?: TransactionStatus;
  date?: Date | string;
  paymentMethod: string;
  recipientId: string;
  clientId?: number;
  expensePayeeName?: string;
}

export interface TransactionArchive {
  id: number;
  date: Date;
  archivedByUserId: string;
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
}

export interface TransactionFilterOptions {
  search?: string;
  type?: TransactionType;
  status?: TransactionStatus;
  clientId?: number;
  recipientId?: string;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  paymentMethod?: string;
  sortBy?: "amount" | "date" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface TransactionsSummary {
  totalIncome: string;
  totalExpense: string;
  netProfit: string;
}

export interface DeleteTransactionValues {
  id: number;
}
