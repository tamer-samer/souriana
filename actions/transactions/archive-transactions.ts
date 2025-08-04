"use server";

import db from "@/db/drizzle";
import { transactions, transactionsArchive } from "@/db/schema";
import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type TValues = {
  totalIncome: string;
  totalExpense: string;
  netProfit: string;
};
export async function archiveTransactions(values: TValues) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("خطأ في التوثيق!");
    }

    if (!values.totalIncome || !values.netProfit || !values.totalExpense) {
      throw new Error("هناك نقص في البيانات!");
    }

    const data = await db
      .insert(transactionsArchive)
      .values({
        date: new Date(),
        archivedByUserId: userId,
        totalIncome: values.totalIncome,
        totalExpense: values.totalExpense,
        netProfit: values.totalIncome,
      })
      .returning();

    await db
      .update(transactions)
      .set({
        archiveId: data[0].id,
      })
      .where(isNull(transactions.archiveId));

    revalidatePath("/transactions");
    return {
      success: true,
      message: "تمت الأرشفة بنجاح",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ ما!",
    };
  }
}
