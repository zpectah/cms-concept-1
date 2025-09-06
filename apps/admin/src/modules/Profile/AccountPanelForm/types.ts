import z from 'zod';
import { ProfileAccountPanelFormSchema } from './schema';

export type IProfileAccountPanelForm = z.infer<typeof ProfileAccountPanelFormSchema>;
