// eslint-disable-next-line @nx/enforce-module-boundaries
import config from '../../../../../project.config.json';

const keys = [...config.model.attachments.type] as const;

export const attachmentsTypeKeys = keys.reduce((acc, key) => {
  acc[key] = key;
  return acc;
}, {} as Record<(typeof keys)[number], string>) as { [K in (typeof keys)[number]]: K };

export const attachmentsTypeKeysArray = [...keys] as [string, ...string[]];
