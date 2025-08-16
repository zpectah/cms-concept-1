import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import resources from './resources';

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ['en'], // TODO #config
    lng: 'en', // TODO #config
    fallbackLng: 'en', // TODO #config
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });
