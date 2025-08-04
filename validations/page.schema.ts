import { z } from "zod";

const pageSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "اسم الصفحة يجب أن يكون 3 أحرف على الأقل." }),
    imageUrl: z
      .url({ message: "الرجاء إدخال رابط صورة صالح." })
      .optional()
      .or(z.literal("")),
    facebookUrl: z
      .url({ message: "الرجاء إدخال رابط صالح." })
      .optional()
      .or(z.literal("")),
    instagramUrl: z
      .url({ message: "الرجاء إدخال رابط صالح." })
      .optional()
      .or(z.literal("")),
    telegramUrl: z
      .url({ message: "الرجاء إدخال رابط صالح." })
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      return (
        (data.facebookUrl !== null &&
          data.facebookUrl !== undefined &&
          data.facebookUrl !== "") ||
        (data.instagramUrl !== null &&
          data.instagramUrl !== undefined &&
          data.instagramUrl !== "") ||
        (data.telegramUrl !== null &&
          data.telegramUrl !== undefined &&
          data.telegramUrl !== "")
      );
    },
    {
      message: "يجب إضافة رابط منصة على الأقل.",
      path: ["facebookUrl"],
    }
  );

type TPageForm = z.infer<typeof pageSchema>;
export { pageSchema, type TPageForm };
