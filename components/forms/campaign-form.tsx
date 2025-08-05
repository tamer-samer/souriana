"use client";

import { ChangeEvent, Dispatch, SetStateAction, useTransition } from "react";
import { Noop, RefCallBack, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { campaignSchema, TCampaignForm } from "@/validations/campaign.schema";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
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

import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";

type CampaignFormProps = {
  initialData?: TCampaignForm;
  onSubmit: (
    clientId: number,
    values: TCampaignForm,
    campaignId: number
  ) => Promise<any>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  buttonLabel: string;
  clientId: number;
  campaignId?: number;
};

type Field = {
  onChange: any;
  onBlur?: Noop;
  value?: unknown;
  disabled?: boolean | undefined;
  name?: "facebookLimit" | "instagramLimit" | "telegramLimit";
  ref?: RefCallBack;
};
export function CampaignForm({
  initialData,
  onSubmit,
  setOpenModal,
  buttonLabel,
  clientId,
  campaignId,
}: CampaignFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(campaignSchema),
    defaultValues: initialData || {
      name: "",
      isLimited: false,
      status: "active",
      startDate: undefined,
      endDate: undefined,
      facebookLimit: undefined,
      instagramLimit: undefined,
      telegramLimit: undefined,
      facebookAds: undefined,
      instagramAds: undefined,
      telegramAds: undefined,
    },
  });

  const handleSubmit = (values: TCampaignForm) => {
    startTransition(async () => {
      await onSubmit(clientId, values, campaignId ?? 0).then((res) => {
        if (res.success) {
          toast(res.message);
          setOpenModal(false);
        } else {
          toast.error(res.message);
        }
      });
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
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم الحملة *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
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
                  <SelectTrigger className="bg-accent border-slate-700 text-white transition-colors duration-200 hover:border-slate-600 focus:border-teal-500">
                    <SelectValue placeholder="اختر نوع" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-accent border-slate-700">
                  <SelectItem value="active">
                    <div className="flex items-center space-x-2">نشطة</div>
                  </SelectItem>
                  <SelectItem value="ended">
                    <div className="flex items-center space-x-2">منتهية</div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        {/* Start Date */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>بداية الحملة</FormLabel>
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

        {/* End Date */}
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نهاية الحملة</FormLabel>
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

        {form.watch("isLimited") && (
          <>
            {/* facebook limit */}
            <FormField
              control={form.control}
              name="facebookLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>فيسبوك</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
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
            {/* instagram limit */}
            <FormField
              control={form.control}
              name="instagramLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>انستغرام</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
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
            {/* telegram limit */}
            <FormField
              control={form.control}
              name="telegramLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تلغرام</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
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
          </>
        )}

        {/* Is Limited */}
        <FormField
          name="isLimited"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>حملة بعدد إعلانات محدد؟</FormLabel>
                <FormDescription>
                  إذا تم التحديد، سيطلب منك إدخال عدد الإعلانات لكل منصة.
                </FormDescription>
              </div>
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
