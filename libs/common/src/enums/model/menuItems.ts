export const menuItemsTypeKeys = {
  default: 'default',
  external: 'external',
  section: 'section',
} as const;

export const menuItemsTypeKeysArray = [...Object.keys(menuItemsTypeKeys)] as [string, ...string[]];
