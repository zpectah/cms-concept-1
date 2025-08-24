import z from 'zod';
import { TranslationsDetailFormSchema } from './schema';

export type ITranslationsDetailForm = z.infer<typeof TranslationsDetailFormSchema>;
