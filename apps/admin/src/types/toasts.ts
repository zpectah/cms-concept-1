import { toastsItemSeverityKeys } from '../enums';

export type ToastsItemSeverity = keyof typeof toastsItemSeverityKeys;

export interface ToastsItem {
  id: string;
  title: string;
  severity: ToastsItemSeverity;
}
