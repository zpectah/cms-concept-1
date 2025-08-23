import { membersTypeKeys } from '../../enums';
import { ItemBase } from '../item';

export type MembersType = keyof typeof membersTypeKeys;

export interface MembersItem extends ItemBase {
  type: MembersType;

  email: string;
  password?: string;

  firstName?: string;
  lastName?: string;

  address?: string;
}

export type Members = MembersItem[];

export interface MembersDetail extends MembersItem {
  /* TODO */
}
