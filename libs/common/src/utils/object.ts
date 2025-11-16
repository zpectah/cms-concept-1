export const deepMerge = (target: Record<string, any>, source: Record<string, any>) => {
  const isPlainObject = (val: any): val is Record<string, any> => {
    if (typeof val !== 'object' || val === null) {
      return false;
    }
    const proto = Object.getPrototypeOf(val);

    return proto === null || proto === Object.prototype;
  };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
        deepMerge(targetValue, sourceValue);
      } else if (sourceValue !== undefined) {
        target[key] = sourceValue;
      }
    }
  }

  return target;
};
