// eslint-disable-next-line @nx/enforce-module-boundaries
import config from '../../../../config.project.json';
// eslint-disable-next-line @nx/enforce-module-boundaries
import locales from '../../../../config.locales.json';

const getConfig = () => {
  const env = import.meta.env.MODE ?? 'unknown';

  return {
    env,
    isDev: env === 'development',

    locales,

    ...config,
  };
};

export default getConfig;
