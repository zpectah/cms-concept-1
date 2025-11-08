import { commentsTypeKeys } from '../../enums';
import { ItemBase } from '../item';
import { EnumKeyValues } from '../common';

export type CommentsType = EnumKeyValues<typeof commentsTypeKeys>;

export interface CommentsItem extends ItemBase {
  type: CommentsType;
  sender: string;

  content_type: string; // TODO
  content_id: number; // TODO

  parent: number;
  subject: string;
  content?: string;
}

export type Comments = CommentsItem[];

export type CommentsDetail = CommentsItem & {};
