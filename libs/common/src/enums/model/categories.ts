export const categoriesTypeKeys = {
  default: 'default',
} as const;

export const categoriesTypeKeysArray = [...Object.keys(categoriesTypeKeys)] as [string, ...string[]];
