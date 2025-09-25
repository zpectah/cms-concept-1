import { messagesTypeKeys } from '../../enums';
import { ItemBase } from '../item';

export type MessagesType = keyof typeof messagesTypeKeys;

export interface MessagesItem extends ItemBase {
  type: MessagesType;
  sender: string;
  subject: string;
  content?: string;
  read: boolean;
}

export type Messages = MessagesItem[];

export type MessagesDetail = MessagesItem & {};
