"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { trackedProfiles } from "@/db/schema";
import { DeletePageValues } from "@/types";

export async function deletePageAction({ id }: DeletePageValues) {
  try {
    await db.delete(trackedProfiles).where(eq(trackedProfiles.id, id));

    revalidatePath("/stats");
    return { success: true, message: "تم حذف الصفحة بنجاح." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "فشل حذف الصفحة!",
    };
  }
}
