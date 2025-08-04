import { z } from "zod";

const clientSchema = z.object({
  name: z
    .string()
    .min(3, { message: "اسم الجهة يجب أن يكون 3 أحرف على الأقل." }),
  imageUrl: z
    .url({ message: "الرجاء إدخال رابط صورة صالح." })
    .optional()
    .or(z.literal("")),
});

type TClientForm = z.infer<typeof clientSchema>;
export { clientSchema, type TClientForm };
