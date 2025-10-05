import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';
import { CMS_LOCALES_KEY } from '../constants';
import { getConfig } from '../utils';

export const useLocale = () => {
  const { admin } = getConfig();

  const { i18n } = useTranslation();
  const { locale, setLocale } = useAppStore();

  const initHandler = () => {
    const current = window.localStorage.getItem(CMS_LOCALES_KEY) ?? admin.locale.default;

    setLocale(current);
    i18n.changeLanguage(current);
  };

  return {
    locale,
    setLocales: setLocale,
    onInit: initHandler,
  };
};
