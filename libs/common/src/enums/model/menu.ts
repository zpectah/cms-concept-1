export const menuTypeKeys = {
  default: 'default',
} as const;

export const menuTypeKeysArray = [...Object.keys(menuTypeKeys)] as [string, ...string[]];
