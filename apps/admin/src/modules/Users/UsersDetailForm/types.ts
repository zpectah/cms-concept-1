import z from 'zod';
import { UsersDetailFormSchema } from './schema';

export type IUsersDetailForm = z.infer<typeof UsersDetailFormSchema>;
