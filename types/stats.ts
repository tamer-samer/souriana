export interface TrackedProfile {
  id: number;
  name: string;
  imageUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  telegramUrl?: string;
  createdAt: Date;
}

export interface FollowerRecord {
  id: number;
  profileId: number;
  recordDate: Date;
  facebookCount?: number;
  instagramCount?: number;
  telegramCount?: number;
  createdAt: Date;
}

export interface TrackedProfileWithRecords extends TrackedProfile {
  followerRecords: FollowerRecord[];
}

export interface ProfileFormData {
  name: string;
  imageUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  telegramUrl?: string;
}

export interface FollowerRecordFormData {
  profileId: number;
  recordDate?: Date | string;
  facebookCount?: number;
  instagramCount?: number;
  telegramCount?: number;
}

export interface FollowerGrowth {
  platform: "facebook" | "instagram" | "telegram";
  date: string;
  count: number;
}

export interface ProfileStats {
  id: number;
  name: string;
  totalFacebookFollowers?: number;
  totalInstagramFollowers?: number;
  totalTelegramFollowers?: number;
  facebookGrowth?: number;
  instagramGrowth?: number;
  telegramGrowth?: number;
  lastUpdated?: Date;
}

export interface StatsFilterOptions {
  profileId?: number;
  startDate?: Date;
  endDate?: Date;
  platform?: "facebook" | "instagram" | "telegram" | "all";
}

export interface Social {
  facebook: number;
  instagram: number;
  telegram: number;
}

export interface ActivePlatforms {
  hasFacebook: boolean;
  hasInstagram: boolean;
  hasTelegram: boolean;
}
