export interface MaintenanceAnalyzeResults {
  articles: number[];
  attachments: number[];
  blacklist: number[];
  categories: number[];
  comments: number[];
  members: number[];
  menu: number[];
  menuItems: number[];
  messages: number[];
  pages: number[];
  requests: number[];
  tags: number[];
  translations: number[];
  users: number[];
}

export interface MaintenanceDeleteResults {
  articles: { rows: number };
  attachments: { rows: number; files: number; errors: string[] };
  blacklist: { rows: number };
  categories: { rows: number };
  comments: { rows: number };
  members: { rows: number };
  menu: { rows: number };
  menuItems: { rows: number };
  messages: { rows: number };
  pages: { rows: number };
  requests: { rows: number };
  tags: { rows: number };
  translations: { rows: number };
  users: { rows: number };
}
