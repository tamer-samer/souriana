import { z } from "zod";

type ActivePlatforms = {
  hasFacebook: boolean;
  hasInstagram: boolean;
  hasTelegram: boolean;
};

const createFollowerRecordSchema = (activePlatforms: ActivePlatforms) => {
  return z
    .object({
      recordDate: z.date({
        error: "تاريخ السجل مطلوب.",
      }),

      facebookCount: z
        .number({ error: "يجب أن يكون المدخل رقمًا." })
        .optional()
        .nullable(),
      instagramCount: z
        .number({ error: "يجب أن يكون المدخل رقمًا." })
        .optional()
        .nullable(),
      telegramCount: z
        .number({ error: "يجب أن يكون المدخل رقمًا." })
        .optional()
        .nullable(),
    })
    .superRefine((data, ctx) => {
      if (
        activePlatforms.hasFacebook &&
        (data.facebookCount === undefined || data.facebookCount === null)
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["facebookCount"],
          message: "عدد المتابعين مطلوب لهذه المنصة.",
        });
      }

      if (
        activePlatforms.hasInstagram &&
        (data.instagramCount === undefined || data.instagramCount === null)
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["instagramCount"],
          message: "عدد المتابعين مطلوب لهذه المنصة.",
        });
      }

      if (
        activePlatforms.hasTelegram &&
        (data.telegramCount === undefined || data.telegramCount === null)
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["telegramCount"],
          message: "عدد المتابعين مطلوب لهذه المنصة.",
        });
      }
    });
};

type TFollowerRecordFormValues = z.infer<
  ReturnType<typeof createFollowerRecordSchema>
>;
export { createFollowerRecordSchema, type TFollowerRecordFormValues };
