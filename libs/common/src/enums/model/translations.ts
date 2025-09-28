export const translationsTypeKeys = {
  default: 'default',
} as const;

export const translationsTypeKeysArray = [...Object.keys(translationsTypeKeys)] as [string, ...string[]];
