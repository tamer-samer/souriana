"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { ads } from "@/db/schema";
import { DeleteAdValues } from "@/types";

export async function deleteAdAction(values: DeleteAdValues) {
  try {
    if (!values.id || !values.clientId) {
      return {
        success: false,
        message: "يرجى إدخال جميع الحقول",
      };
    }

    await db.delete(ads).where(eq(ads.id, values.id));

    revalidatePath("/clients");
    revalidatePath(`/clients/${values.clientId}`);
    return { success: true, message: "تم حذف الاعلان بنجاح." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "فشل حذف الاعلان.",
    };
  }
}
