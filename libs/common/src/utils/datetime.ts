export const getTimestamp = () => {
  const now = new Date();

  return now.toISOString();
};
