import z from 'zod';
import { AttachmentsDetailFormSchema } from './schema';

export type IAttachmentsDetailForm = z.infer<typeof AttachmentsDetailFormSchema>;
