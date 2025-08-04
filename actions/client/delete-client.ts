"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { clients } from "@/db/schema";

export async function deleteClientAction(id: number) {
  try {
    await db.delete(clients).where(eq(clients.id, id));

    revalidatePath("/clients");
    return { success: true, message: "تم حذف العميل بنجاح." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "فشل حذف العميل.",
    };
  }
}
