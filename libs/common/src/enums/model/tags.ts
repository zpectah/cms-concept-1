// eslint-disable-next-line @nx/enforce-module-boundaries
import config from '../../../../../project.config.json';

const keys = [...config.model.tags.type] as const;

export const tagsTypeKeys = keys.reduce((acc, key) => {
  acc[key] = key;
  return acc;
}, {} as Record<(typeof keys)[number], string>) as { [K in (typeof keys)[number]]: K };

export const tagsTypeKeysArray = [...keys] as [string, ...string[]];

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
