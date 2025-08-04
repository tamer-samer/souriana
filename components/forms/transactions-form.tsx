"use client";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  useTransition,
} from "react";
import { Noop, RefCallBack, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  transactionsSchema,
  TTransactionsForm,
} from "@/validations/transactions.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Badge } from "@/components/ui/badge";
import { TransactionsClientsSelect } from "../dashboard/transactions";
import { ClientSelect, UserSelect } from "@/types";

type Props = {
  initialData?: TTransactionsForm;
  onSubmit: (values: TTransactionsForm, id: number) => Promise<any>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  buttonLabel: string;
  users: UserSelect[];
  clients: ClientSelect[];
  transactionId?: number;
};

export function TransactionsForm({
  initialData,
  onSubmit,
  setOpenModal,
  buttonLabel,
  users,
  clients,
  transactionId,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [payType, setPayType] = useState<string>(initialData?.type || "income");
  const [isNewClient, setIsNewClient] = useState(false);

  const form = useForm<TTransactionsForm>({
    resolver: zodResolver(transactionsSchema),
    defaultValues: initialData || {
      type: "income",
      amount: undefined,
      status: "pending",
      date: new Date(),
      paymentMethod: "الهرم",
      recipientId: "",
      clientId: undefined,
      newClient: "",
      expensePayeeName: "",
    },
  });

  const handleResetField = (name: "newClient" | "clientId") => {
    form.setValue(name, null);
  };

  const handleSubmit = (values: TTransactionsForm) => {
    startTransition(async () => {
      await onSubmit(values, transactionId ?? 0).then((res) => {
        if (res.success) {
          toast(res.message);
          setOpenModal(false);
        } else {
          toast.error(res.message);
        }
      });
    });
  };

  const handldeAmountChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: {
      onChange: any;
      onBlur?: Noop;
      value?: number;
      disabled?: boolean | undefined;
      name?: "amount";
      ref?: RefCallBack;
    }
  ) => {
    const value = e.target.value;
    if (value === "") {
      field.onChange(null);
      return;
    }

    const numValue = Number(value);

    if (!isNaN(numValue)) {
      field.onChange(numValue);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-300">
                  النوع *
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    setPayType(value);
                    if (value === "income") {
                      form.setValue("expensePayeeName", "");
                    } else {
                      form.setValue("clientId", undefined);
                    }
                    field.onChange(value);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-accent border-slate-700 text-white transition-colors duration-200 hover:border-slate-600 focus:border-teal-500">
                      <SelectValue placeholder="اختر نوع" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-accent border-slate-700">
                    <SelectItem value="income">
                      <div className="flex items-center space-x-2">استلام</div>
                    </SelectItem>
                    <SelectItem value="expense">
                      <div className="flex items-center space-x-2">دفع</div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-300">
                  المبلغ *
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="أدخل مبلغاً"
                    className="bg-accent border-slate-700 text-white placeholder:text-slate-400 transition-colors duration-200 hover:border-slate-600 focus:border-teal-500"
                    {...field}
                    value={
                      field.value === null ||
                      field.value === undefined ||
                      field.value === 0
                        ? ""
                        : field.value.toString()
                    }
                    onChange={(e) => handldeAmountChange(e, field)}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

        {payType !== "income" && (
          <FormField
            control={form.control}
            name="expensePayeeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-300">
                  المدفوع له *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="أدخل اسماً"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 transition-colors duration-200 hover:border-slate-600 focus:border-teal-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        )}

        {isNewClient && payType === "income" && (
          <FormField
            control={form.control}
            name="newClient"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-300">
                    الجهة المعلنة *
                    <Badge
                      onClick={() => {
                        handleResetField("newClient");
                        setIsNewClient(false);
                      }}
                    >
                      عودة للخيارات
                    </Badge>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="أدخل اسم الجهة المعلنة"
                      className="bg-accent border-slate-700 text-white placeholder:text-slate-400 transition-colors duration-200 hover:border-slate-600 focus:border-teal-500"
                      {...field}
                      value={field.value == null ? "" : field.value}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              );
            }}
          />
        )}

        {payType === "income" && !isNewClient && (
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-300">
                  المعلن *
                </FormLabel>
                <TransactionsClientsSelect
                  clients={clients}
                  field={field}
                  setIsNewClient={setIsNewClient}
                  handleResetField={handleResetField}
                />
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* users */}
          <FormField
            control={form.control}
            name="recipientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-300">
                  المستخدم *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString() || undefined}
                >
                  <FormControl>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white transition-colors duration-200 hover:border-slate-600 focus:border-teal-500">
                      <SelectValue placeholder="اختر المستخدم" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="bg-slate-800 border-slate-700">
                    {users.map((user) => {
                      return (
                        <SelectItem key={user.clerkId} value={user.clerkId}>
                          {user.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-300">
                  التاريخ *
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      setValue={field.onChange}
                      className="w-full"
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* PaymentMethod */}
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-300">
                  طريقة {payType === "income" ? "الاستلام" : "الدفع"} *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="أدخل طريقة دفع"
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 transition-colors duration-200 hover:border-slate-600 focus:border-teal-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-300">
                  الحالة *
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white transition-colors duration-200 hover:border-slate-600 focus:border-teal-500">
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="completed">مكتملة</SelectItem>
                    <SelectItem value="pending">في الانتظار</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? <Spinner /> : buttonLabel}
        </Button>
      </form>
    </Form>
  );
}
