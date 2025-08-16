import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';

export const useLocale = () => {
  const { i18n } = useTranslation();
  const { locale, setLocale } = useAppStore();

  const initHandler = () => {
    const current = window.localStorage.getItem('APP_LOCALE') ?? 'en'; // TODO #config

    setLocale(current);
    i18n.changeLanguage(current);
  };

  return {
    locale,
    setLocales: setLocale,
    onInit: initHandler,
  };
};
