import z from 'zod';
import { MembersDetailFormSchema } from './schema';

export type IMembersDetailForm = z.infer<typeof MembersDetailFormSchema>;
