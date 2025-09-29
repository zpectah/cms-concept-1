import { Address, GpsLocation } from '../form';

export interface SettingsProject {
  name: string;
  description?: string;
}

export interface SettingsLocales {
  active: string[];
  default: string;
  available: string[];
}

export interface SettingsCompany {
  name: string;
  description?: string;
  id?: string;
  email: string[];
  phone: (string | number)[];
  address: Address;
  location: GpsLocation;
  bank?: string;
}

export interface SettingsMeta {
  title: string;
  description: string;
  keywords: string[];
  robots: string;
}

export interface SettingsState {
  debug: boolean;
  maintenance: boolean;
}

export interface SettingsMessages {
  active: boolean;
  recipients: string[];
}

export interface SettingsComments {
  active: boolean;
  anonymous: boolean;
}

export interface SettingsMembers {
  active: boolean;
}

export type SettingsGlobal = {
  project: SettingsProject;
  company: SettingsCompany;
};

export type SettingsClient = {
  meta: SettingsMeta;
  state: SettingsState;
  messages: SettingsMessages;
  comments: SettingsComments;
  members: SettingsMembers;
};

export interface Settings extends SettingsGlobal, SettingsClient {
  locales: SettingsLocales;
}
