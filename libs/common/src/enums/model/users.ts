export const usersTypeKeys = {
  default: 'default',
} as const;

export const usersAccessKeys: Record<string, number> = {
  none: 0,
  redactor: 3,
  chiefRedactor: 5,
  admin: 7,
} as const;

export const usersTypeKeysArray = [...Object.keys(usersTypeKeys)] as [string, ...string[]];
export const usersAccessKeysArray = [...Object.keys(usersAccessKeys)] as [string, ...string[]];
