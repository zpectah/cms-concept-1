import { useEffect, useState } from 'react';
import { getConfig } from '../utils';
import { useSettingsQuery } from '../hooks-query';

export const useFormDetailControl = () => {
  const { admin } = getConfig();

  const [locales, setLocales] = useState<string[]>(admin.locale.locales);
  const [locale, setLocale] = useState<string>(admin.locale.default);

  const { settingsQuery } = useSettingsQuery();

  const { data: settingsData } = settingsQuery;

  useEffect(() => {
    if (settingsData) {
      setLocales(settingsData.locales.active);
      setLocale(settingsData.locales.default);
    }
  }, [settingsData]);

  return {
    locales,
    locale,
    onLocaleChange: setLocale,
  };
};
