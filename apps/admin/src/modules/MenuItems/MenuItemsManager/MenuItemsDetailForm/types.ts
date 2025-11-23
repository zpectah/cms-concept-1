import z from 'zod';
import { MenuItemsDetailFormSchema } from './schema';

export type IMenuItemsDetailForm = z.infer<typeof MenuItemsDetailFormSchema>;
