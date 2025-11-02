import { useEffect } from 'react';
import { useLocale, useTheme } from '../hooks';

export const useAppInit = (callback?: () => void) => {
  const { onInit: onLocaleInit } = useLocale();
  const { onInit: onThemeInit } = useTheme();

  const initHandler = () => {
    onLocaleInit();
    onThemeInit();
    callback?.();
  };

  // We want to trigger only once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(initHandler, []);
};
