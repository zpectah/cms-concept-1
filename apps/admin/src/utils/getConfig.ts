// eslint-disable-next-line @nx/enforce-module-boundaries
import config from '../../../../project.config.json';

const getConfig = () => {
  const env = import.meta.env.MODE ?? 'unknown';

  return {
    env,
    isDev: env === 'development',
    ...config,
  };
};

export default getConfig;
