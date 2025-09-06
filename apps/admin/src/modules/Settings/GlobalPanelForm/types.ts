import z from 'zod';
import { SettingsGlobalPanelFormSchema } from './schema';

export type ISettingsGlobalPanelForm = z.infer<typeof SettingsGlobalPanelFormSchema>;
