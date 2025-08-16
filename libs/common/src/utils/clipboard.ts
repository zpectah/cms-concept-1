export const copyToClipboard = (value: string | undefined, callback?: () => void) => {
  if (!navigator) {
    throw new Error('Navigator is not available');
  }

  if (!value) {
    throw new Error('Value is required');
  }

  navigator.clipboard.writeText(value).then(() => {
    callback?.();
  });
};
