import z from 'zod';
import { AttachmentsCreateFormSchema } from './schema';

export type IAttachmentsCreateForm = z.infer<typeof AttachmentsCreateFormSchema>;
