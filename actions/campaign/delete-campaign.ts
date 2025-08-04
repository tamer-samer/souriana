"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { campaigns } from "@/db/schema";

export async function deleteCampaignAction(id: number, clientId: number) {
  try {
    await db.delete(campaigns).where(eq(campaigns.id, id));

    revalidatePath(`/clients/${clientId}`);
    return { success: true, message: "تم حذف الحملة بنجاح." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "فشل حذف الحملة.",
    };
  }
}
