export const getEnvironmentVariables = () => {
  const env = import.meta.env.MODE ?? 'unknown';

  return {
    env,

    uploads: {
      target: '../../../dist/uploads/', // TODO
      source: 'http://localhost:8080/', // TODO
    },
  };
};
