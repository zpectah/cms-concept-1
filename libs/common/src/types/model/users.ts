import { usersTypeKeys } from '../../enums';
import { ItemBase } from '../item';

export type UsersType = keyof typeof usersTypeKeys;

export interface UsersItem extends ItemBase {
  type: UsersType;

  email: string;
  password?: string;

  firstName?: string;
  lastName?: string;

  accessLevel: number; // TODO
}

export type Users = UsersItem[];

export interface UsersDetail extends UsersItem {
  /* TODO */
}
