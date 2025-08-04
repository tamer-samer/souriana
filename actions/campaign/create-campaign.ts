"use server";

import { revalidatePath } from "next/cache";
import db from "@/db/drizzle";
import { campaigns } from "@/db/schema";
import {
  campaignSchema,
  type TCampaignForm,
} from "@/validations/campaign.schema";
import { eq } from "drizzle-orm";

export async function createCampaignAction(
  clientId: number,
  values: TCampaignForm
) {
  try {
    const validatedData = campaignSchema.parse(values);

    if (validatedData.status === "active") {
      await db
        .update(campaigns)
        .set({ status: "ended" })
        .where(eq(campaigns.clientId, clientId));
    }

    await db.insert(campaigns).values({
      clientId: clientId,
      name: validatedData.name,
      status: validatedData.status,
      startDate: validatedData.startDate,
      endDate: validatedData.endDate,
      isLimited: validatedData.isLimited,
      facebookLimit: validatedData.facebookLimit ?? 0,
      instagramLimit: validatedData.instagramLimit ?? 0,
      telegramLimit: validatedData.telegramLimit ?? 0,
    });

    revalidatePath(`/clients/${clientId}`);
    return { success: true, message: "تمت إضافة الحملة بنجاح." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "فشل في إضافة الحملة.",
    };
  }
}
