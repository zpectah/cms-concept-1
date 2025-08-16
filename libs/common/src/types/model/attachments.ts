import { attachmentsTypeKeys } from '../../enums';
import { ItemBase } from '../item';

export type AttachmentsType = keyof typeof attachmentsTypeKeys;

export interface AttachmentsItem extends ItemBase {
  type: AttachmentsType;
}

export type Attachments = AttachmentsItem[];

export interface AttachmentsDetail extends AttachmentsItem {
  file_name: string;
  file_type: string;
  file_ext: string;
  file_size: string;
}
