import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";
import fs from "fs";
import path from "path";

// تعريف الاتصال بقاعدة البيانات
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

// دالة مساعدة للتحقق من أن القيمة هي سلسلة نصية لتاريخ ISO
const isIsoDateString = (value: any): boolean => {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
  );
};

// دالة مساعدة لعملية التحويل
const transformDataForImport = (data: any[]) => {
  return data.map((row) => {
    const newRow: Record<string, any> = {};
    for (const key in row) {
      const value = row[key];
      // إذا كانت القيمة سلسلة نصية لتاريخ ISO، قم بتحويلها إلى كائن Date
      if (isIsoDateString(value)) {
        newRow[key] = new Date(value);
      } else {
        newRow[key] = value;
      }
    }
    return newRow;
  });
};

const main = async () => {
  try {
    console.log("Starting data import...");

    const dataDir = path.join(process.cwd(), "data");

    if (!fs.existsSync(dataDir)) {
      throw new Error(`Data directory not found at: ${dataDir}`);
    }

    // تأكد من أن هذا الترتيب صحيح لتجنب أخطاء Foreign Key
    const importOrder: (keyof typeof schema)[] = [
      "users",
      "clients",
      "campaigns",
      "ads",
      "transactionsArchive",
      "transactions",
    ];

    console.log("Deleting existing data...");
    await db.delete(schema.transactionsArchive);
    await db.delete(schema.transactions);
    await db.delete(schema.ads);
    await db.delete(schema.campaigns);
    await db.delete(schema.clients);
    await db.delete(schema.users);
    console.log("Existing data deleted.");

    for (const tableName of importOrder) {
      const filePath = path.join(dataDir, `${tableName}.json`);

      const fileContent = fs.readFileSync(filePath, "utf-8");
      const dataToInsert = JSON.parse(fileContent);

      if (dataToInsert.length > 0) {
        // --- هذه هي الخطوة الجديدة والمهمة ---
        // تحويل سلاسل التواريخ النصية إلى كائنات Date قبل الإدخال
        const transformedData = transformDataForImport(dataToInsert);

        await db.insert(schema[tableName]).values(transformedData);
        console.log(
          `Successfully inserted ${transformedData.length} records into table '${tableName}'.`
        );
      } else {
        console.log(`No data to insert for table '${tableName}'.`);
      }
    }

    console.log("Data import finished successfully!");
  } catch (error) {
    console.error("Failed to import data:", error);
    throw new Error("Failed to import database data!");
  }
};

main();
