import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';
import { CMS_LOCALES_KEY } from '../constants';
import { getConfig } from '../utils';

export const useLocale = () => {
  const { admin } = getConfig();

  const { i18n } = useTranslation();
  const { locale, setLocale } = useAppStore();

  const localeChange = (loc: string) => {
    setLocale(loc);
    i18n.changeLanguage(loc);
  };

  const initHandler = () => {
    const current = window.localStorage.getItem(CMS_LOCALES_KEY) ?? admin.locale.default;

    localeChange(current);
  };

  return {
    locale,
    onChange: localeChange,
    onInit: initHandler,
  };
};
