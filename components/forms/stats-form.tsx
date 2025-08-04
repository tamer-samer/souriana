"use client";

import { ChangeEvent, Dispatch, SetStateAction, useTransition } from "react";
import { Noop, RefCallBack, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createFollowerRecordSchema,
  TFollowerRecordFormValues,
} from "@/validations/stats.schema";
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
import { DatePicker } from "@/components/ui/date-picker";

import { ActivePlatforms } from "@/types";

type StatsFormProps = {
  initialData?: TFollowerRecordFormValues;
  onSubmit: (
    pageId: number,
    values: TFollowerRecordFormValues,
    activePlatforms: {
      hasFacebook: boolean;
      hasInstagram: boolean;
      hasTelegram: boolean;
    },
    statsId: number
  ) => Promise<any>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  buttonLabel: string;
  pageId: number;
  statsId?: number;
  activePlatforms: ActivePlatforms;
};

type Field = {
  onChange: any;
  onBlur?: Noop;
  value?: number | null;
  disabled?: boolean | undefined;
  name?: "facebookCount" | "instagramCount" | "telegramCount";
  ref?: RefCallBack;
};
export function StatsForm({
  initialData,
  onSubmit,
  setOpenModal,
  buttonLabel,
  pageId,
  statsId,
  activePlatforms,
}: StatsFormProps) {
  const [isPending, startTransition] = useTransition();

  const statsSchema = createFollowerRecordSchema(activePlatforms);

  const form = useForm<TFollowerRecordFormValues>({
    resolver: zodResolver(statsSchema),
    defaultValues: initialData || {
      recordDate: new Date(),
      facebookCount: undefined,
      instagramCount: undefined,
      telegramCount: undefined,
    },
  });

  const handleSubmit = (values: TFollowerRecordFormValues) => {
    startTransition(async () => {
      await onSubmit(pageId, values, activePlatforms, statsId ?? 0).then(
        (res) => {
          if (res.success) {
            toast(res.message);
            setOpenModal(false);
          } else {
            toast.error(res.message);
          }
        }
      );
    });
  };

  const handldeFollowersChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: Field
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

  const followersValue = (field: Field) =>
    field.value === null || field.value === undefined || field.value === 0
      ? ""
      : field.value.toString();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Start Date */}
        <FormField
          control={form.control}
          name="recordDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>التاريخ *</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  setValue={field.onChange}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Facebook */}
        {activePlatforms.hasFacebook && (
          <FormField
            control={form.control}
            name="facebookCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>فيسبوك *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={followersValue(field)}
                    onChange={(e) => {
                      handldeFollowersChange(e, field);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Instagram */}
        {activePlatforms.hasInstagram && (
          <FormField
            control={form.control}
            name="instagramCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>انستغرام *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={followersValue(field)}
                    onChange={(e) => {
                      handldeFollowersChange(e, field);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Telegram */}
        {activePlatforms.hasTelegram && (
          <FormField
            control={form.control}
            name="telegramCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تلغرام *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={followersValue(field)}
                    onChange={(e) => {
                      handldeFollowersChange(e, field);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? <Spinner /> : buttonLabel}
        </Button>
      </form>
    </Form>
  );
}
