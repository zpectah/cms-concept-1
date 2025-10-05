// eslint-disable-next-line @nx/enforce-module-boundaries
import locales from '../../../../config.locales.json';

export const getFormatByLocale = (locale: string) => {
  const typedLocales = locales as Record<string, { format: { date: string; time: string } }>;

  return typedLocales[locale].format;
};
