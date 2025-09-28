export const pagesTypeKeys = {
  default: 'default',
} as const;

export const pagesTypeKeysArray = [...Object.keys(pagesTypeKeys)] as [string, ...string[]];
