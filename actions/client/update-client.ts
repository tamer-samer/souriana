"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { clients } from "@/db/schema";
import { clientSchema, type TClientForm } from "@/validations/client.schema";

export async function updateClientAction(id: number, values: TClientForm) {
  try {
    const validatedData = clientSchema.parse(values);

    await db
      .update(clients)
      .set({
        name: validatedData.name,
        imageUrl: validatedData.imageUrl,
      })
      .where(eq(clients.id, id));

    revalidatePath("/clients");
    revalidatePath(`/clients/${id}`);
    return { success: true, message: "تم تحديث الجهة الإعلانية بنجاح." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "فشل تحديث الجهة الإعلانية." };
  }
}
