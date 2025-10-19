import { settingsPanelsKeys } from './enums';

export type SettingsPanels = keyof typeof settingsPanelsKeys;

export interface SettingsPanelTabs {
  name: SettingsPanels;
  path: string;
  label: string;
  hidden: boolean;
}
