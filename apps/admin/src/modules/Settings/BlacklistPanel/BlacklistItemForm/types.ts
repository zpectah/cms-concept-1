import z from 'zod';
import { BlacklistItemFormSchema } from './schema';

export type IBlacklistItemForm = z.infer<typeof BlacklistItemFormSchema>;

interface BlacklistItemBase {
  afterSubmit?: () => void;
}

export type BlacklistItemFormProps = BlacklistItemBase;

export type useBlacklistItemFormProps = BlacklistItemBase;
