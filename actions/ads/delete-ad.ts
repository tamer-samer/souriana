"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { ads } from "@/db/schema";

type AdValues = {
  adId: number;
  clientId: number;
};

export async function deleteAdAction(values: AdValues) {
  try {
    if (!values.adId || !values.clientId) {
      return {
        success: false,
        message: "يرجى إدخال جميع الحقول",
      };
    }

    await db.delete(ads).where(eq(ads.id, values.adId));

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
