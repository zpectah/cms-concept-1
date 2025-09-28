export const articlesTypeKeys = {
  default: 'default',
  event: 'event',
} as const;

export const articlesTypeKeysArray = [...Object.keys(articlesTypeKeys)] as [string, ...string[]];
