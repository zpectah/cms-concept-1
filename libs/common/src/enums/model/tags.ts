export const tagsTypeKeys = {
  default: 'default',
} as const;

export const tagsTypeKeysArray = [...Object.keys(tagsTypeKeys)] as [string, ...string[]];

export const tagsColorKeys = {
  none: 'none',
  red: 'red',
  orange: 'orange',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
  pink: 'pink',
  purple: 'purple',
  brown: 'brown',
  black: 'black',
  white: 'white',
} as const;

export const tagsColorKeysArray = [...Object.keys(tagsColorKeys)] as [string, ...string[]];
