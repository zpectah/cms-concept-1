import i18next from 'i18next';

export const getOptionValue = (key: string) => i18next.t(`options:${key}`);
