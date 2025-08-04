"use server";

import { revalidatePath } from "next/cache";

import db from "@/db/drizzle";
import { ads } from "@/db/schema";
type AdValues = {
  campaignId: number;
  platform: "facebook" | "instagram" | "telegram";
  publishDate: Date;
  clientId: number;
};
export async function createAdAction(values: AdValues) {
  try {
    if (!values.publishDate || !values.campaignId || !values.platform) {
      return {
        success: false,
        message: "يرجى إدخال جميع الحقول",
      };
    }

    await db.insert(ads).values(values);

    revalidatePath("/clients");
    revalidatePath(`/clients/${values.clientId}`);
    return { success: true, message: "تمت إضافة الاعلان بنجاح." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "فشل في إضافة الاعلان.",
    };
  }
}
