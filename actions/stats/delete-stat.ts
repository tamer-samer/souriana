"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { followerRecords } from "@/db/schema";

export async function deleteStatAction(id: number, pageId: number) {
  try {
    await db.delete(followerRecords).where(eq(followerRecords.id, id));

    revalidatePath(`/stats/${pageId}`);
    return { success: true, message: "تم حذف الإحصائية بنجاح." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "فشل حذف الإحصائية.",
    };
  }
}
