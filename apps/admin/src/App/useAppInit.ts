import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useLocale, useTheme } from '../hooks';
import { getConfig } from '../config';

export const useAppInit = (callback?: () => void) => {
  const {
    apps: { mapbox },
  } = getConfig();

  const { onInit: onLocaleInit } = useLocale();
  const { onInit: onThemeInit } = useTheme();

  const initHandler = () => {
    mapboxgl.accessToken = mapbox.token;

    onLocaleInit();
    onThemeInit();

    callback?.();
  };

  // We want to trigger only once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(initHandler, []);
};
