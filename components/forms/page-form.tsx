"use client";

import { Dispatch, SetStateAction, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pageSchema, TPageForm } from "@/validations/page.schema";
import { toast } from "sonner";
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

type ClientFormProps = {
  initialData?: TPageForm;
  onSubmit: (values: TPageForm) => Promise<any>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  buttonLabel: string;
};

export function PageForm({
  initialData,
  onSubmit,
  setOpenModal,
  buttonLabel,
}: ClientFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TPageForm>({
    resolver: zodResolver(pageSchema),
    defaultValues: initialData || {
      name: "",
      imageUrl: "",
      facebookUrl: "",
      instagramUrl: "",
      telegramUrl: "",
    },
  });

  const handleSubmit = (values: TPageForm) => {
    startTransition(async () => {
      await onSubmit(values).then((res) => {
        if (res.success) {
          toast(res.message);
          setOpenModal(false);
        } else {
          toast.error(res.message);
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم الصفحة *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رابط الصورة</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="facebookUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رابط الفيسبوك</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instagramUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رابط الانستغرام</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telegramUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رابط التلغرام</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? <Spinner /> : buttonLabel}
        </Button>
      </form>
    </Form>
  );
}
