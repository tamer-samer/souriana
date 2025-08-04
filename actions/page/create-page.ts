"use server";

import { revalidatePath } from "next/cache";
import db from "@/db/drizzle";
import { trackedProfiles } from "@/db/schema";
import { pageSchema, type TPageForm } from "@/validations/page.schema";

export async function createPageAction(values: TPageForm) {
  try {
    const validatedData = pageSchema.parse(values);

    await db.insert(trackedProfiles).values({
      name: validatedData.name,
      imageUrl: validatedData.imageUrl,
      facebookUrl: validatedData.facebookUrl,
      instagramUrl: validatedData.instagramUrl,
      telegramUrl: validatedData.telegramUrl,
    });

    revalidatePath("/stats");
    return { success: true, message: "تمت إضافة الصفحة بنجاح." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "فشل في إضافة الصفحة.",
    };
  }
}
