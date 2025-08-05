"use server";

import { revalidatePath } from "next/cache";
import db from "@/db/drizzle";
import { clients, transactions } from "@/db/schema";
import {
  transactionsSchema,
  type TTransactionsForm,
} from "@/validations/transactions.schema";
import { eq } from "drizzle-orm";

export async function updateTransactionAction(
  values: TTransactionsForm,
  id: number
) {
  try {
    const validatedData = transactionsSchema.parse(values);

    let newClientId: number | undefined;
    if (!validatedData.clientId && validatedData.newClient) {
      const data = await db
        .insert(clients)
        .values({
          name: validatedData.newClient,
        })
        .returning();
      newClientId = data[0].id;
    }

    await db
      .update(transactions)
      .set({
        type: validatedData.type,
        amount: validatedData.amount,
        status: validatedData.status,
        date: validatedData.date,
        paymentMethod: validatedData.paymentMethod,
        recipientId: validatedData.recipientId,
        clientId: newClientId ? newClientId : validatedData.clientId,
        expensePayeeName: validatedData.expensePayeeName,
        archiveId: null,
      })
      .where(eq(transactions.id, id));

    revalidatePath("/transactions");
    return { success: true, message: "تم تحديث المعاملة بنجاح." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "فشل في تحديث المعاملة.",
    };
  }
}
