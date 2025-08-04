"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { trackedProfiles } from "@/db/schema";
import { pageSchema, type TPageForm } from "@/validations/page.schema";

export async function updatePageAction(id: number, values: TPageForm) {
  try {
    const validatedData = pageSchema.parse(values);

    await db
      .update(trackedProfiles)
      .set({
        name: validatedData.name,
        imageUrl: validatedData.imageUrl,
        facebookUrl: validatedData.facebookUrl,
        instagramUrl: validatedData.instagramUrl,
        telegramUrl: validatedData.telegramUrl,
      })
      .where(eq(trackedProfiles.id, id));

    revalidatePath("/stats");
    revalidatePath(`/stats/${id}`);
    return { success: true, message: "تم تحديث الصفحة بنجاح." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "فشل تحديث الصفحة." };
  }
}
