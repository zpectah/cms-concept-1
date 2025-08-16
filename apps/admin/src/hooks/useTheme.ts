import { useColorScheme } from '@mui/material/styles';
import { ThemeMode } from '../types';
import { themeModeKeys } from '../enums';
import { useAppStore } from '../store';
import { useEffect } from 'react';

export const useTheme = () => {
  const { mode, setMode } = useColorScheme();
  const { ...store } = useAppStore();

  const setModeHandler = (mode: ThemeMode) => {
    if (!mode) return;

    setMode(mode);
    store.setMode(mode);
    console.log('mode', mode);
  };

  const toggleModeHandler = () => {
    let val;

    switch (mode) {
      case themeModeKeys.dark:
        val = themeModeKeys.light;
        break;
      case themeModeKeys.light:
        val = themeModeKeys.dark;
        break;
      default:
        val = themeModeKeys.light;
        break;
    }

    setModeHandler(val as ThemeMode);
  };

  const initHandler = () => {
    const current = window.localStorage.getItem('APP_THEME_MODE') ?? 'light';

    setModeHandler(current as ThemeMode);
  };

  useEffect(() => {
    console.log('mode changed', mode);
  }, [mode]);

  return {
    mode,
    setMode: setModeHandler,
    toggleMode: toggleModeHandler,
    onInit: initHandler,
  };
};
