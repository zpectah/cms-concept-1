/* eslint-disable @nx/enforce-module-boundaries */

import config from '../../../../config.project.json';
import locales from '../../../../config.locales.json';
import routes from './routes';

export const getConfig = () => {
  return {
    ...config,
    locales,
    routes,
  };
};
