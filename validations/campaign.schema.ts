import { z } from "zod";

const campaignSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "اسم الحملة يجب أن يكون حرفين على الأقل." }),
    status: z.enum(["active", "ended"], {
      message: "حالة غير صالحة. يجب أن تكون 'active' أو 'ended' فقط.",
    }),
    startDate: z.date().nullable().optional(),
    endDate: z.date().nullable().optional(),
    isLimited: z.boolean().default(false),
    facebookLimit: z.coerce
      .number()
      .min(0, "العدد يجب أن يكون 0 أو أكثر.")
      .nullable()
      .optional(),
    instagramLimit: z.coerce
      .number()
      .min(0, "العدد يجب أن يكون 0 أو أكثر.")
      .nullable()
      .optional(),
    telegramLimit: z.coerce
      .number()
      .min(0, "العدد يجب أن يكون 0 أو أكثر.")
      .nullable()
      .optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate >= data.startDate;
      }
      return true;
    },
    {
      message: "تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء.",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (data.isLimited) {
        return (
          (data.facebookLimit !== null &&
            data.facebookLimit !== undefined &&
            data.facebookLimit !== 0) ||
          (data.instagramLimit !== null &&
            data.instagramLimit !== undefined &&
            data.instagramLimit !== 0) ||
          (data.telegramLimit !== null &&
            data.telegramLimit !== undefined &&
            data.telegramLimit !== 0)
        );
      }
      return true;
    },
    {
      message:
        "في الحملات المحددة، يجب تحديد عدد الإعلانات لمنصة واحدة على الأقل.",
      path: ["facebookLimit"],
    }
  );

type TCampaignForm = z.infer<typeof campaignSchema>;
export { campaignSchema, type TCampaignForm };
