export const menuItemsTypeKeys = {
  default: 'default',
} as const;

export const menuItemsTypeKeysArray = [...Object.keys(menuItemsTypeKeys)] as [string, ...string[]];
