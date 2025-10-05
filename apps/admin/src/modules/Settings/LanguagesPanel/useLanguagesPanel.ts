import { useSettingsQuery } from '../../../hooks-query';
import { useCallback } from 'react';

export const useLanguagesPanel = () => {
  const { settingsQuery } = useSettingsQuery();

  const { data: settingsData, isLoading } = settingsQuery;

  const localeInstallHandler = (locale: string) => {
    // TODO
    console.log('install new locale', locale);
  };

  const localeToggleHandler = (locale: string) => {
    // TODO
    console.log('locale toggle', locale);
  };

  const localeDefaultHandler = (locale: string) => {
    // TODO
    console.log('locale default', locale);
  };

  const isLocaleInstalled = useCallback(
    (locale: string) => settingsData?.locales && settingsData?.locales.installed.indexOf(locale) > -1,
    [settingsData]
  );

  const isLocaleActive = useCallback(
    (locale: string) => settingsData?.locales && settingsData?.locales.active.indexOf(locale) > -1,
    [settingsData]
  );

  const isLocaleDefault = useCallback(
    (locale: string) => settingsData?.locales && settingsData?.locales.default === locale,
    [settingsData]
  );

  return {
    form: {},
    locales: settingsData?.locales,
    isLoading,

    isLocaleInstalled,
    isLocaleActive,
    isLocaleDefault,

    onLocaleInstall: localeInstallHandler,
    isInstalling: false, // TODO

    onLocaleToggle: localeToggleHandler,
    onLocaleDefault: localeDefaultHandler,
    isUpdating: false, // TODO
  };
};
