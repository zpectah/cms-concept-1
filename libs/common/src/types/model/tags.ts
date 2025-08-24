import { tagsTypeKeys } from '../../enums';
import { ItemBase } from '../item';

export type TagsType = keyof typeof tagsTypeKeys;

export interface TagsItem extends ItemBase {
  type: TagsType;
}

export type Tags = TagsItem[];

export type TagsDetail = TagsItem & {};
