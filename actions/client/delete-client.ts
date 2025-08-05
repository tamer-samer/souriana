"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { clients } from "@/db/schema";
import { DeleteClientValues } from "@/types";

export async function deleteClientAction({ id }: DeleteClientValues) {
  try {
    await db.delete(clients).where(eq(clients.id, id));

    revalidatePath("/clients");
    return { success: true, message: "تم حذف الجهة الإعلانية بنجاح." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "فشل حذف الجهة الإعلانية.",
    };
  }
}
