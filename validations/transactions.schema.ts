import { z } from "zod";

const transactionsSchema = z
  .object({
    type: z.enum(["income", "expense"], {
      message: "حالة غير صالحة. يجب أن تكون 'income' أو 'expense' فقط.",
    }),
    amount: z
      .number({ message: "يجب إدخال رقم." })
      .min(0, "العدد يجب أن يكون 0 أو أكثر."),
    status: z.enum(["pending", "completed"], {
      message: "حالة غير صالحة. يجب أن تكون 'pending' أو 'completed' فقط.",
    }),
    date: z.date({ message: "يجب إدخال تاريخ." }),
    paymentMethod: z
      .string({ message: "يجب إدخال طريقة دفع/استلام." })
      .min(1, "يجب إدحال طلريقة الدفع"),
    recipientId: z
      .string({ message: "يجب إدخال اسم المستلم." })
      .min(1, "اسم المستخدم مطلوب"),
    expensePayeeName: z
      .string({ message: "يجب إدخال اسم المدفوع له." })
      .optional(),
    clientId: z
      .number({ message: "يجب إدخال الجهة المعلنة." })
      .optional()
      .nullable(),
    newClient: z
      .string({ message: "يجب إدخال الجهة المعلنة." })
      .optional()
      .nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "income" && !data.clientId && !data.newClient) {
      ctx.addIssue({
        path: ["clientId"],
        code: "custom",
        message: "يجب إدخال الجهة المعلنة.",
      });

      ctx.addIssue({
        path: ["newClient"],
        code: "custom",
        message: "يجب إدخال الجهة المعلنة.",
      });
    }

    if (data.type === "expense" && !data.expensePayeeName) {
      ctx.addIssue({
        path: ["expensePayeeName"],
        code: "custom",
        message: "يجب إدخال اسم المدفوع له.",
      });
    }
  });

type TTransactionsForm = z.infer<typeof transactionsSchema>;
export { transactionsSchema, type TTransactionsForm };
