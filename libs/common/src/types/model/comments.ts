import { commentsTypeKeys } from '../../enums';
import { ItemBase } from '../item';
import { EnumKeyValues } from '../common';
import { Model } from './model';

export type CommentsType = EnumKeyValues<typeof commentsTypeKeys>;
export type CommentsContentType = Model;

export interface CommentsItem extends ItemBase {
  type: CommentsType;
  sender: string;
  content_type: CommentsContentType;
  content_id: number;
  parent: number;
  subject: string;
  content: string;
}

export type Comments = CommentsItem[];

export type CommentsDetail = CommentsItem & {};
