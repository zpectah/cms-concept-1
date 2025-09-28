export const commentsTypeKeys = {
  default: 'default',
} as const;

export const commentsTypeKeysArray = [...Object.keys(commentsTypeKeys)] as [string, ...string[]];
