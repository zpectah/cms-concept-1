import { membersTypeKeys } from '../../enums';
import { ItemBase } from '../item';

export type MembersType = keyof typeof membersTypeKeys;

export interface MembersItem extends ItemBase {
  type: MembersType;
}

export type Members = MembersItem[];

export interface MembersDetail extends MembersItem {
  /* TODO */
}
