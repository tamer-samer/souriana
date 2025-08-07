import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding...");

    await db.delete(schema.ads);
    await db.delete(schema.campaigns);
    await db.delete(schema.transactions);
    await db.delete(schema.transactionsArchive);
    await db.delete(schema.clients);
    await db.delete(schema.followerRecords);
    await db.delete(schema.trackedProfiles);
    await db.delete(schema.users);

    await db.insert(schema.users).values([
      {
        id: 1,
        clerkId: "user_30aYTbUy1RNVzWPJIWeVpkg4Fl4",
        name: "Hussein Ali",
        email: "hussein@syr-edu.com",
        role: "admin",
      },
      {
        id: 2,
        clerkId: "user_30aYv7ihHU86BdwTPnyc9Agehq5",
        name: "Saleh Shaheen",
        email: "saleh@syr-edu.com",
        role: "partner",
      },
      {
        id: 3,
        clerkId: "user_30aYyDPksFWvqtZmG3n3VLABWjA",
        name: "Deaa Naseef",
        email: "deaa@syr-edu.com",
        role: "partner",
      },
    ]);
    // await db.insert(schema.clients).values([
    //   {
    //     id: 1,
    //     name: "جلجامش",
    //     imageUrl:
    //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAl9z3mG37AhLd2ghPBH5-J9blHXHivKO5XQ&s",
    //   },
    //   {
    //     id: 2,
    //     name: "تحضيري",
    //     imageUrl:
    //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAl9z3mG37AhLd2ghPBH5-J9blHXHivKO5XQ&s",
    //   },
    // ]);

    // await db.insert(schema.campaigns).values([
    //   {
    //     id: 1,
    //     name: "بداية السنة",
    //     clientId: 1,
    //     status: "ended",
    //   },
    //   {
    //     id: 2,
    //     name: "نهاية السنة",
    //     clientId: 1,
    //     status: "active",
    //   },
    //   {
    //     id: 3,
    //     name: "بداية الفصل",
    //     clientId: 2,
    //     status: "active",
    //   },
    // ]);

    // await db.insert(schema.ads).values([
    //   {
    //     id: 1,
    //     campaignId: 1,
    //     platform: "facebook",
    //   },
    //   {
    //     id: 2,
    //     campaignId: 1,
    //     platform: "telegram",
    //   },
    //   {
    //     id: 3,
    //     campaignId: 1,
    //     platform: "facebook",
    //   },
    //   {
    //     id: 4,
    //     campaignId: 2,
    //     platform: "instagram",
    //   },
    //   {
    //     id: 5,
    //     campaignId: 3,
    //     platform: "instagram",
    //   },
    // ]);

    console.log("Finish Seeding...");
  } catch (error) {
    console.log(error);
    throw new Error("Faild to seed the database!");
  }
};

main();
