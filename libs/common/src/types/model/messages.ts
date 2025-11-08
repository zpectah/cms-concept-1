import { messagesTypeKeys } from '../../enums';
import { ItemBase } from '../item';
import { EnumKeyValues } from '../common';

export type MessagesType = EnumKeyValues<typeof messagesTypeKeys>;

export interface MessagesItem extends ItemBase {
  type: MessagesType;
  sender: string;
  subject: string;
  content?: string;
  read: boolean;
}

export type Messages = MessagesItem[];

export type MessagesDetail = MessagesItem & {};
