import { tagsColorKeys, tagsTypeKeys } from '../../enums';
import { ItemBase } from '../item';
import { EnumKeyValues } from '../common';

export type TagsType = EnumKeyValues<typeof tagsTypeKeys>;
export type TagsColor = EnumKeyValues<typeof tagsColorKeys>;

export interface TagsItem extends ItemBase {
  type: TagsType;
  color: TagsColor;
}

export type Tags = TagsItem[];

export type TagsDetail = TagsItem & {};
