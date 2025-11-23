export const menuItemsTypeKeys = {
  default: 'default',
  external: 'external',
} as const;

export const menuItemsTypeKeysArray = [...Object.keys(menuItemsTypeKeys)] as [string, ...string[]];
