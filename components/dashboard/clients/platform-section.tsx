"use client";

import { createAdAction } from "@/actions/ads/create-ad";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { AdCard } from "../ads";
import { DatePicker } from "@/components/ui/date-picker";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { LiaTelegram } from "react-icons/lia";

type Props = {
  campaignId: number;
  clientId: number;
  platform: "facebook" | "instagram" | "telegram";
  data: {
    ads: {
      platform: "facebook" | "instagram" | "telegram";
      id: number;
      createdAt: Date;
      campaignId: number;
      publishDate: Date;
    }[];
    limit: number | null;
  };
  color: string;
  isActive: boolean;
};

const icons = {
  facebook: FiFacebook,
  instagram: FiInstagram,
  telegram: LiaTelegram,
};

export const PlatformSection = ({
  campaignId,
  clientId,
  platform,
  data,
  color,
  isActive,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const [adDate, setAdDate] = useState<Date | undefined>(undefined);

  const Icon = icons[platform];

  const handleAddAd = () => {
    if (adDate === undefined) {
      toast.error("يجب تحديد تاريخ أولاً!");
      return;
    }
    const values = {
      campaignId: campaignId,
      platform: platform,
      publishDate: adDate,
      clientId: clientId,
    };

    startTransition(() => {
      createAdAction(values)
        .then((res) => {
          if (res.success) {
            toast(res.message);
          } else {
            toast.error(res.message);
          }
        })
        .catch(() => toast.error("حدث خطأ ما!"));
    });
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "facebook":
        return "فيسبوك";
      case "instagram":
        return "انستغرام";
      case "telegram":
        return "تلغرام";
    }
  };

  return (
    <div
      className={`p-4 rounded-lg border max-h-[300px] overflow-y-auto ${
        isActive
          ? "bg-accent/50 border-slate-700"
          : "bg-secondary/30 border-accent opacity-60"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon className={`h-5 w-5 ${color}`} />
          <span className="font-medium text-white capitalize">
            {getPlatformName(platform)}
          </span>
        </div>
        <Badge variant="secondary" className="bg-slate-700 text-slate-300">
          {data.ads.length} {data.limit ? `/ ${data.limit}` : ""}
        </Badge>
      </div>

      {isActive && (
        <div className="flex items-center space-x-2 mb-3">
          <DatePicker value={adDate} setValue={setAdDate} className="flex-1" />
          <Button
            size={"icon"}
            className="rounded-md"
            onClick={handleAddAd}
            disabled={isPending}
          >
            {isPending ? <Spinner /> : <Plus />}
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {data.ads.map((ad, i) => (
          <AdCard key={ad.id} ad={ad} clientId={clientId} index={i} />
        ))}
      </div>
    </div>
  );
};
