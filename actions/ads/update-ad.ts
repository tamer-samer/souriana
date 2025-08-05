"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { ads } from "@/db/schema";

type AdValues = {
  publishDate: Date;
  clientId: number;
};
export async function updateAdAction(id: number, values: AdValues) {
  try {
    if (!values.publishDate || !values.clientId) {
      return {
        success: false,
        message: "يرجى إدخال جميع الحقول",
      };
    }

    await db
      .update(ads)
      .set({
        publishDate: values.publishDate,
      })
      .where(eq(ads.id, id));

    revalidatePath("/clients");
    revalidatePath(`/clients/${values.clientId}`);
    return { success: true, message: "تم تحديث الإعلان بنجاح." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "فشل تحديث الإعلان." };
  }
}
