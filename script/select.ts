import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";
import fs from "fs";
import path from "path";

// تعريف الاتصال بقاعدة البيانات
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Starting data export...");

    // تحديد المجلد الذي سيتم حفظ البيانات فيه
    const outputDir = path.join(process.cwd(), "data");

    // إنشاء المجلد إذا لم يكن موجودًا
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // أسماء الجداول التي تريد تصديرها. يجب أن تكون متطابقة مع مفاتيح الـ schema
    const tablesToExport: (keyof typeof schema)[] = [
      "users",
      "clients",
      "campaigns",
      "ads",
      "transactions",
      "transactionsArchive",
    ];

    for (const tableName of tablesToExport) {
      // جلب جميع البيانات من الجدول
      const tableData = await db.select().from(schema[tableName]);

      // تعريف مسار الملف
      const filePath = path.join(outputDir, `${tableName}.json`);

      // كتابة البيانات في ملف JSON مع تنسيق جميل
      fs.writeFileSync(filePath, JSON.stringify(tableData, null, 2));

      console.log(
        `Successfully exported ${tableData.length} records from table '${tableName}' to ${filePath}`
      );
    }

    console.log("Data export finished successfully!");
  } catch (error) {
    console.error("Failed to export data:", error);
    throw new Error("Failed to export database data!");
  }
};

main();
