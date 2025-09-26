import { tagsColorKeys, tagsTypeKeys } from '../../enums';
import { ItemBase } from '../item';

export type TagsType = keyof typeof tagsTypeKeys;
export type TagsColor = keyof typeof tagsColorKeys;

export interface TagsItem extends ItemBase {
  type: TagsType;
  color: TagsColor;
}

export type Tags = TagsItem[];

export type TagsDetail = TagsItem & {};
