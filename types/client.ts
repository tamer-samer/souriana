/**
 * Client related types
 */

import { Campaign } from "./campaign";

export interface Client {
  id: number;
  name: string;
  imageUrl?: string;
  display: boolean;
  createdAt: Date;
}

export interface ClientWithCampaigns extends Client {
  campaigns: Campaign[];
}

export interface ClientFormData {
  name: string;
  imageUrl?: string;
  display?: boolean;
}

export interface ClientFilterOptions {
  search?: string;
  display?: boolean;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface ClientStats {
  id: number;
  name: string;
  campaignCount: number;
  activeCount: number;
  totalAds: number;
}
