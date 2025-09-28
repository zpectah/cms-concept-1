export const attachmentsTypeKeys = {
  default: 'default',
} as const;

export const attachmentsTypeKeysArray = [...Object.keys(attachmentsTypeKeys)] as [string, ...string[]];
