import { blacklistTypeKeys } from '../../enums';
import { EnumKeyValues } from '../common';

export type BlacklistType = EnumKeyValues<typeof blacklistTypeKeys>;

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
