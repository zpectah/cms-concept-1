import { usersTypeKeys, usersAccessKeys } from '../../enums';
import { ItemBase } from '../item';
import { EnumKeyValues } from '../common';

export type UsersType = EnumKeyValues<typeof usersTypeKeys>;
export type UsersAccessRights = EnumKeyValues<typeof usersAccessKeys>;
export type UsersAccessRightsKeys = 'none' | 'redactor' | 'chiefRedactor' | 'admin';

export interface UsersItem extends ItemBase {
  type: UsersType;
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  access_rights: UsersAccessRights;
  avatar_image?: string;
  avatar_hash?: string;
}

export type Users = UsersItem[];

export type UsersDetail = UsersItem & {};
