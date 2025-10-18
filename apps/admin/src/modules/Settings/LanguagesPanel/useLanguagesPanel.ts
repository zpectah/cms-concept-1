import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettingsQuery } from '../../../hooks-query';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';

export const useLanguagesPanel = () => {
  const [isInstalling, setIsInstalling] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const { t } = useTranslation(['common', 'modules']);
  const { addToast } = useAppStore();
  const { settingsQuery, settingsLocaleInstallMutation, settingsLocaleDefaultMutation, settingsLocaleToggleMutation } =
    useSettingsQuery();

  const { data: settingsData, refetch, isLoading } = settingsQuery;
  const { mutate: onLocaleInstall } = settingsLocaleInstallMutation;
  const { mutate: onLocaleDefault } = settingsLocaleDefaultMutation;
  const { mutate: onLocaleToggle } = settingsLocaleToggleMutation;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    setIsUpdating(null);
    console.warn(err);
  };

  const localeInstallHandler = (locale: string) => {
    if (!locale) return;

    setIsInstalling(locale);

    onLocaleInstall(
      { locale },
      {
        onSuccess: (res) => {
          // TODO: result
          console.log('res', res);
          addToast(
            t('modules:settings.tabs.language.message.localeInstalled', { locale }),
            'success',
            TOAST_SUCCESS_TIMEOUT_DEFAULT
          );
          setIsInstalling(null);
          refetch();
        },
        onError: (err) => {
          addToast(t('message.error.common'), 'error');
          setIsInstalling(null);
          console.warn(err);
        },
      }
    );
  };

  const localeToggleHandler = (locale: string) => {
    if (!locale) return;

    setIsUpdating(locale);

    onLocaleToggle(
      { locale },
      {
        onSuccess: (res) => {
          // TODO: result
          console.log('res', res);
          addToast(
            t('modules:settings.tabs.language.message.localeUpdated', { locale }),
            'success',
            TOAST_SUCCESS_TIMEOUT_DEFAULT
          );
          setIsUpdating(null);
          refetch();
        },
        onError,
      }
    );
  };

  const localeDefaultHandler = (locale: string) => {
    if (!locale) return;

    setIsUpdating(locale);

    onLocaleDefault(
      { locale },
      {
        onSuccess: (res) => {
          // TODO: result
          console.log('res', res);
          addToast(
            t('modules:settings.tabs.language.message.localeDefault', { locale }),
            'success',
            TOAST_SUCCESS_TIMEOUT_DEFAULT
          );
          setIsUpdating(null);
          refetch();
        },
        onError,
      }
    );
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
    isInstalling,
    onLocaleToggle: localeToggleHandler,
    onLocaleDefault: localeDefaultHandler,
    isUpdating,
  };
};
