export const getModelLocales = <T>(locales: string[], model: T) => {
  return locales?.reduce((loc: Record<string, T>, lang: string) => {
    loc[lang] = model;

    return loc;
  }, {});
};
