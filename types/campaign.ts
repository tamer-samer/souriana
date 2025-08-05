export type CampaignStatus = "active" | "ended";
export type Platform = "facebook" | "instagram" | "telegram";

export interface Campaign {
  id: number;
  name: string;
  clientId: number;
  status: CampaignStatus;
  startDate?: Date | null;
  endDate?: Date | null;
  isLimited: boolean;
  totalAds: number;
  createdAt: Date;
}

export type PlatformAds = {
  ads: Ad[];
  limit: number | null;
};
export type CampaignPlatform = {
  facebook: PlatformAds;
  instagram: PlatformAds;
  telegram: PlatformAds;
};
export interface CampaignWithPlatforms extends Campaign {
  platforms: CampaignPlatform;
}

export interface CampaignWithClient extends Campaign {
  client: {
    id: number;
    name: string;
    imageUrl?: string;
  };
}

export interface CampaignWithAds extends Campaign {
  ads: Ad[];
}

export interface CampaignFormData {
  name: string;
  clientId: number;
  status?: CampaignStatus;
  startDate?: Date | string;
  endDate?: Date | string;
  isLimited: boolean;
  facebookLimit?: number;
  instagramLimit?: number;
  telegramLimit?: number;
}

export interface Ad {
  id: number;
  campaignId: number;
  platform: Platform;
  publishDate: Date;
  createdAt: Date;
}

export interface AdFormData {
  campaignId: number;
  platform: Platform;
  publishDate?: Date | string;
}

export interface CampaignFilterOptions {
  search?: string;
  clientId?: number;
  status?: CampaignStatus;
  isLimited?: boolean;
  sortBy?: "name" | "startDate" | "endDate" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface DeleteAdValues {
  id: number;
  clientId: number;
}

export interface DeleteCampaignValues extends DeleteAdValues {}
