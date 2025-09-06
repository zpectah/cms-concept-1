import z from 'zod';
import { SettingsClientPanelFormSchema } from './schema';

export type ISettingsClientPanelForm = z.infer<typeof SettingsClientPanelFormSchema>;
