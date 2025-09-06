import z from 'zod';
import { formFieldsSchemas } from '../../../schema';

export const SettingsClientPanelFormSchema = z.object({
  metaTitle: formFieldsSchemas.required_string,
  metaDescription: formFieldsSchemas.string.optional(),
  metaKeywords: formFieldsSchemas.stringArray.optional(),
  metaRobots: formFieldsSchemas.required_string,
  stateDebug: formFieldsSchemas.boolean,
  stateMaintenance: formFieldsSchemas.boolean,
  messagesActive: formFieldsSchemas.boolean,
  messagesRecipients: formFieldsSchemas.stringArray.optional(),
  commentsActive: formFieldsSchemas.boolean,
  commentsAnonymous: formFieldsSchemas.boolean,
  membersActive: formFieldsSchemas.boolean,
});
