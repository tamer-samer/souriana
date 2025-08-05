"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { transactions } from "@/db/schema";
import { DeleteTransactionValues } from "@/types";

export async function deleteTransactionAction({ id }: DeleteTransactionValues) {
  try {
    await db.delete(transactions).where(eq(transactions.id, id));

    revalidatePath("/transactions");
    return { success: true, message: "تم حذف المعاملة بنجاح." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "فشل حذف المعاملة.",
    };
  }
}
