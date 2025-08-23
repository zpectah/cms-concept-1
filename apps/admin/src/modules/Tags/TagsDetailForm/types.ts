import z from 'zod';
import { TagsDetailFormSchema } from './schema';

export type ITagsDetailForm = z.infer<typeof TagsDetailFormSchema>;
