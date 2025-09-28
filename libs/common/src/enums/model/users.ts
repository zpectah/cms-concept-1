export const usersTypeKeys = {
  default: 'default',
} as const;

export const usersTypeKeysArray = [...Object.keys(usersTypeKeys)] as [string, ...string[]];
