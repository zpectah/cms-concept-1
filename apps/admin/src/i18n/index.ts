import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
// eslint-disable-next-line @nx/enforce-module-boundaries
import config from '../../../../config.project.json';
import resources from './resources';

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: config.admin.locale.active,
    lng: config.admin.locale.default,
    fallbackLng: config.admin.locale.default,
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });
