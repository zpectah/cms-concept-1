export const getEnvironmentVariables = () => {
  const env = import.meta.env.MODE ?? 'unknown';

  return {
    env,
    uploadsPath: '../../../dist/uploads/', // TODO
    uploadsSource: 'http://localhost:8080/', // TODO
  };
};
