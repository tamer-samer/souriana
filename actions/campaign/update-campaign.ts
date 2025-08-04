"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { campaigns } from "@/db/schema";
import {
  campaignSchema,
  type TCampaignForm,
} from "@/validations/campaign.schema";

export async function updateCampaignAction(
  clientId: number,
  values: TCampaignForm,
  id: number
) {
  try {
    const validatedData = campaignSchema.parse(values);

    if (validatedData.status === "active") {
      await db
        .update(campaigns)
        .set({ status: "ended" })
        .where(eq(campaigns.clientId, clientId));
    }

    await db
      .update(campaigns)
      .set({
        name: validatedData.name,
        status: validatedData.status,
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
        isLimited: validatedData.isLimited,
        facebookLimit: validatedData.facebookLimit ?? 0,
        instagramLimit: validatedData.instagramLimit ?? 0,
        telegramLimit: validatedData.telegramLimit ?? 0,
      })
      .where(eq(campaigns.id, id));

    revalidatePath("/clients");
    revalidatePath(`/clients/${clientId}`);
    return { success: true, message: "تم تحديث الحملة بنجاح." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "فشل تحديث الحملة." };
  }
}
