"use server";

import { revalidatePath } from "next/cache";
import db from "@/db/drizzle";
import { followerRecords } from "@/db/schema";
import {
  createFollowerRecordSchema,
  type TFollowerRecordFormValues,
} from "@/validations/stats.schema";

export async function createStatsAction(
  pageId: number,
  values: TFollowerRecordFormValues,
  activePlatforms: {
    hasFacebook: boolean;
    hasInstagram: boolean;
    hasTelegram: boolean;
  }
) {
  try {
    const statsSchema = createFollowerRecordSchema(activePlatforms);

    const validatedData = statsSchema.parse(values);

    await db.insert(followerRecords).values({
      profileId: pageId,
      recordDate: validatedData.recordDate,
      facebookCount: validatedData.facebookCount ?? 0,
      instagramCount: validatedData.instagramCount ?? 0,
      telegramCount: validatedData.telegramCount ?? 0,
    });

    revalidatePath(`/stats/${pageId}`);
    return { success: true, message: "تمت إضافة الإحصائية بنجاح." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "فشل في إضافة الإحصائية.",
    };
  }
}
