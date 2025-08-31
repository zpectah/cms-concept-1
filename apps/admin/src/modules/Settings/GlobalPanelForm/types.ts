import z from 'zod';
import { SettingsGlobalPanelFormSchema } from './schema';

export type SettingsGlobalPanelForm = z.infer<typeof SettingsGlobalPanelFormSchema>;
