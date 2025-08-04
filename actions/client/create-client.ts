"use server";

import { revalidatePath } from "next/cache";
import db from "@/db/drizzle";
import { clients } from "@/db/schema";
import { clientSchema, type TClientForm } from "@/validations/client.schema";

export async function createClientAction(values: TClientForm) {
  try {
    const validatedData = clientSchema.parse(values);

    await db.insert(clients).values({
      name: validatedData.name,
      imageUrl: validatedData.imageUrl,
      display: true,
    });

    revalidatePath("/clients");
    return { success: true, message: "تمت إضافة العميل بنجاح." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "فشل في إضافة العميل.",
    };
  }
}
