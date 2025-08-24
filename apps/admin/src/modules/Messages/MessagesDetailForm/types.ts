import z from 'zod';
import { MessagesDetailFormSchema } from './schema';

export type IMessagesDetailForm = z.infer<typeof MessagesDetailFormSchema>;
