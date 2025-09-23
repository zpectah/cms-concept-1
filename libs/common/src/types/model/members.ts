import { membersTypeKeys } from '../../enums';
import { ItemBase } from '../item';
import { Address } from '../form';

export type MembersType = keyof typeof membersTypeKeys;

export interface MembersItem extends ItemBase {
  type: MembersType;

  // TODO
  email: string;
  password?: string;

  firstName?: string;
  lastName?: string;

  address?: Address;
}

export type Members = MembersItem[];

export type MembersDetail = MembersItem & {};
