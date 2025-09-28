export const messagesTypeKeys = {
  default: 'default',
} as const;

export const messagesTypeKeysArray = [...Object.keys(messagesTypeKeys)] as [string, ...string[]];
