import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env"
    );
  }

  const headerPayload = await headers();

  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", { status: 400 });
  }

  const eventType = evt.type;

  // Handle user creation event
  if (eventType === "user.created") {
    await db.insert(users).values({
      clerkId: evt.data.id,
      email: evt.data.email_addresses[0].email_address,
      name: `${evt.data.first_name || ""} ${evt.data.last_name || ""}`.trim(),
      imageUrl: evt.data.image_url,
      role: (evt.data.public_metadata?.role as any) || "user",
    });
    return new Response("User created successfully", { status: 201 });
  }

  // Handle user update event
  if (eventType === "user.updated") {
    await db
      .update(users)
      .set({
        email: evt.data.email_addresses[0].email_address,
        name: `${evt.data.first_name || ""} ${evt.data.last_name || ""}`.trim(),
        imageUrl: evt.data.image_url,
        role: (evt.data.public_metadata?.role as any) || "user",
      })
      .where(eq(users.clerkId, evt.data.id));
    return new Response("User updated successfully", { status: 200 });
  }

  // Handle user deletion event
  if (eventType === "user.deleted") {
    await db.delete(users).where(eq(users.clerkId, evt.data.id as string));
    return new Response("User deleted successfully", { status: 200 });
  }

  return new Response("", { status: 200 });
}
