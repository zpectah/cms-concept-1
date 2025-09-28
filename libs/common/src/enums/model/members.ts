export const membersTypeKeys = {
  default: 'default',
} as const;

export const membersTypeKeysArray = [...Object.keys(membersTypeKeys)] as [string, ...string[]];
