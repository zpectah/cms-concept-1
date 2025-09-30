export const getClearFileName = (filename: string) => {
  const lastDot = filename.lastIndexOf('.');

  if (lastDot === -1) return filename;

  return filename.substring(0, lastDot);
};

export const getFileExtension = (filename: string) => filename.split('.').pop()?.toLowerCase() || '';
