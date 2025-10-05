export interface BlacklistItem {
  id: number;
  ipaddress?: string;
  email: string;
  active: boolean;
  created: string;
}

export type Blacklist = BlacklistItem[];
