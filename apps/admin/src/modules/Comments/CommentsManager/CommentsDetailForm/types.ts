import z from 'zod';
import { CommentsItemDetailFormSchema } from './schema';

export type ICommentsItemDetailForm = z.infer<typeof CommentsItemDetailFormSchema>;
