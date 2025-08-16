import { usersTypeKeys } from '../../enums';
import { ItemBase } from '../item';

export type UsersType = keyof typeof usersTypeKeys;

export interface UsersItem extends ItemBase {
  type: UsersType;
}

export type Users = UsersItem[];

export interface UsersDetail extends UsersItem {
  /* TODO */
}
