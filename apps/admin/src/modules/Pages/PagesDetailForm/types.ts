import z from 'zod';
import { PagesDetailFormSchema } from './schema';

export type IPagesDetailForm = z.infer<typeof PagesDetailFormSchema>;
