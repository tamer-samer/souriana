/**
 * Database related types
 */

import {
  users,
  clients,
  campaigns,
  ads,
  transactions,
  transactionsArchive,
  trackedProfiles,
  followerRecords,
} from "../db/schema";

// Infer types from schema
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// Select types (for retrieving data)
export type UserSelect = InferSelectModel<typeof users>;
export type ClientSelect = InferSelectModel<typeof clients>;
export type CampaignSelect = InferSelectModel<typeof campaigns>;
export type AdSelect = InferSelectModel<typeof ads>;
export type TransactionSelect = InferSelectModel<typeof transactions>;
export type TransactionArchiveSelect = InferSelectModel<
  typeof transactionsArchive
>;
export type TrackedProfileSelect = InferSelectModel<typeof trackedProfiles>;
export type FollowerRecordSelect = InferSelectModel<typeof followerRecords>;

// Insert types (for creating new records)
export type UserInsert = InferInsertModel<typeof users>;
export type ClientInsert = InferInsertModel<typeof clients>;
export type CampaignInsert = InferInsertModel<typeof campaigns>;
export type AdInsert = InferInsertModel<typeof ads>;
export type TransactionInsert = InferInsertModel<typeof transactions>;
export type TransactionArchiveInsert = InferInsertModel<
  typeof transactionsArchive
>;
export type TrackedProfileInsert = InferInsertModel<typeof trackedProfiles>;
export type FollowerRecordInsert = InferInsertModel<typeof followerRecords>;

// Database query options
export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: {
    column: string;
    direction: "asc" | "desc";
  };
  where?: Record<string, any>;
}

// Join result types
export interface ClientWithCampaignsResult extends ClientSelect {
  campaigns: CampaignSelect[];
}

export interface CampaignWithAdsResult extends CampaignSelect {
  ads: AdSelect[];
  client: ClientSelect;
}

export interface TransactionWithRelationsResult extends TransactionSelect {
  recipient: UserSelect;
  client?: ClientSelect;
  archive?: TransactionArchiveSelect;
}

export interface TrackedProfileWithRecordsResult extends TrackedProfileSelect {
  followerRecords: FollowerRecordSelect[];
}
