"use server";

import { revalidatePath } from "next/cache";
import db from "@/db/drizzle";
import { followerRecords } from "@/db/schema";
import {
  createFollowerRecordSchema,
  type TFollowerRecordFormValues,
} from "@/validations/stats.schema";
import { eq } from "drizzle-orm";

export async function updateStatsAction(
  pageId: number,
  values: TFollowerRecordFormValues,
  activePlatforms: {
    hasFacebook: boolean;
    hasInstagram: boolean;
    hasTelegram: boolean;
  },
  statId: number
) {
  try {
    const statsSchema = createFollowerRecordSchema(activePlatforms);

    const validatedData = statsSchema.parse(values);

    await db
      .update(followerRecords)
      .set({
        profileId: pageId,
        recordDate: validatedData.recordDate,
        facebookCount: validatedData.facebookCount ?? 0,
        instagramCount: validatedData.instagramCount ?? 0,
        telegramCount: validatedData.telegramCount ?? 0,
      })
      .where(eq(followerRecords.id, statId));

    revalidatePath(`/stats/${pageId}`);
    return { success: true, message: "تم تعديل الإحصائية بنجاح." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "فشل في تحديث الإحصائية.",
    };
  }
}
