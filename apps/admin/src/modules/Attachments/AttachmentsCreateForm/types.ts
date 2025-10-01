import z from 'zod';
import { FileUploaderQueue } from '../../../types';
import { AttachmentsCreateFormSchema } from './schema';

export type IAttachmentsCreateForm = z.infer<typeof AttachmentsCreateFormSchema>;

export interface AttachmentsQueueProps {
  queue: FileUploaderQueue;
  onRemove: (index: number) => void;
}
