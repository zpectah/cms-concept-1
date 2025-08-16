import { messagesTypeKeys } from '../../enums';
import { ItemBase } from '../item';

export type MessagesType = keyof typeof messagesTypeKeys;

export interface MessagesItem extends ItemBase {
  type: MessagesType;
}

export type Messages = MessagesItem[];

export interface MessagesDetail extends MessagesItem {
  /* TODO */
}
