import z from 'zod';
import { MenuDetailFormSchema } from './schema';

export type IMenuDetailForm = z.infer<typeof MenuDetailFormSchema>;
