export const blacklistTypeKeys = {
  default: 'default',
} as const;

export const blacklistTypeKeysArray = [...Object.keys(blacklistTypeKeys)] as [string, ...string[]];
