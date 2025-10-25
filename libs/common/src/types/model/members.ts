import { membersTypeKeys } from '../../enums';
import { ItemBase } from '../item';
import { Address } from '../form';

export type MembersType = keyof typeof membersTypeKeys;

export interface MembersItem extends ItemBase {
  type: MembersType;

  // TODO
  email: string;
  password?: string;

  first_name?: string;
  last_name?: string;

  address?: Partial<Address>;
  flat_no?: string;

  description?: string;
}

export type Members = MembersItem[];

export type MembersDetail = MembersItem & {};
