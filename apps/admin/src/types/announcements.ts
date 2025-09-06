import { announcementsItemSeverityKeys } from '../enums';

export type AnnouncementsItemSeverity = keyof typeof announcementsItemSeverityKeys;

export interface AnnouncementsItem {
  id: string;
  title: string;
  severity: AnnouncementsItemSeverity;
}
