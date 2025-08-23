import z from 'zod';
import { CategoriesDetailFormSchema } from './schema';

export type ICategoriesDetailForm = z.infer<typeof CategoriesDetailFormSchema>;
