import { commentsTypeKeys } from '../../enums';
import { ItemBase } from '../item';

export type CommentsType = keyof typeof commentsTypeKeys;

export interface CommentsItem extends ItemBase {
  type: CommentsType;
  sender: string;
  content_type: string; // TODO
  content_id: number;
  parent: number;
}

export type Comments = CommentsItem[];

export interface CommentsDetail extends CommentsItem {
  subject: string;
  content?: string;
}
