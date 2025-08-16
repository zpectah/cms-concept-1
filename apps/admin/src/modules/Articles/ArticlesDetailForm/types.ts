import z from 'zod';
import { ArticlesDetailFormSchema } from './schema';

export type IArticlesDetailForm = z.infer<typeof ArticlesDetailFormSchema>;
