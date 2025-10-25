import { blacklistTypeKeys } from '../../enums';

export type BlacklistType = keyof typeof blacklistTypeKeys;

export interface BlacklistItem {
  id: number;
  type: BlacklistType;
  ipaddress?: string;
  email: string;
  active: boolean;
  deleted: boolean;
  created: string;
}

export type Blacklist = BlacklistItem[];
