import { usersTypeKeys } from '../../enums';
import { ItemBase } from '../item';

export type UsersType = keyof typeof usersTypeKeys;

export interface UsersItem extends ItemBase {
  type: UsersType;
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  access_rights: number; // TODO: enum
}

export type Users = UsersItem[];

export type UsersDetail = UsersItem & {};
