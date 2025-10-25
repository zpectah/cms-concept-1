export interface RequestsItem {
  id: number;
  type: string; // TODO
  token: string;
  applicant: string;
  status: number;
  created: string;
  updated: string;
}

export type Requests = RequestsItem[];
