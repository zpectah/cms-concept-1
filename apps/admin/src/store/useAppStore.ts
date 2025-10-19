import { create } from 'zustand';
import { PaletteMode } from '@mui/material';
import { getRandomId } from '@common';
import { ToastsItem, ToastsItemSeverity, AnnouncementsItem, AnnouncementsItemSeverity } from '../types';
import { toastsItemSeverityKeys } from '../enums';
import { getConfig } from '../utils';
import { CMS_LOCALES_KEY, CMS_THEME_MODE_KEY, FEEDBACK_COMMON_TIMEOUT_DEFAULT } from '../constants';

interface AppStore {
  locale: string;
  setLocale: (locale: string) => void;
  mode: PaletteMode | string;
  setMode: (mode: PaletteMode) => void;
  // Toasts
  toasts: ToastsItem[];
  addToast: (title: string, severity?: ToastsItemSeverity, autoclose?: number | boolean) => void;
  removeToast: (id: string) => void;
  // Announcements
  announcements: AnnouncementsItem[];
  addAnnouncement: (title: string, severity?: AnnouncementsItemSeverity, autoclose?: number | boolean) => void;
  removeAnnouncement: (id: string) => void;
  // Profile dialog
  profileDialogOpen: boolean;
  toggleProfileDialog: () => void;
}

const useAppStore = create<AppStore>((set, getState) => {
  const {
    admin: { locale: localeCfg, theme },
  } = getConfig();

  const locale = window.localStorage.getItem(CMS_LOCALES_KEY) ?? localeCfg.default;
  const mode = window.localStorage.getItem(CMS_THEME_MODE_KEY) ?? theme.default;
  const toasts: ToastsItem[] = [];
  const announcements: AnnouncementsItem[] = [];
  const profileDialogOpen = false;

  const setLocalesHandler = (locale: string) => {
    set({ locale });
    window.localStorage.setItem(CMS_LOCALES_KEY, locale);
  };

  const setModeHandler = (mode: PaletteMode) => {
    set({ mode });
    window.localStorage.setItem(CMS_THEME_MODE_KEY, mode as string);
  };

  const removeToastHandler = (id: string) => {
    const tmpToasts = [...getState().toasts];
    const index = tmpToasts.findIndex((item) => item.id === id);

    if (index > -1) tmpToasts.splice(index, 1);

    set({ toasts: tmpToasts });
  };

  const addToastHandler = (
    title: string,
    severity: ToastsItemSeverity = toastsItemSeverityKeys.info,
    autoclose?: number | boolean
  ) => {
    const tmpToasts = [...getState().toasts];
    const id = getRandomId();

    tmpToasts.push({
      id,
      title,
      severity,
    });

    if (autoclose) {
      const timeout = typeof autoclose === 'number' ? autoclose : FEEDBACK_COMMON_TIMEOUT_DEFAULT;

      setTimeout(() => removeToastHandler(id), timeout);
    }

    set({ toasts: tmpToasts });
  };

  const removeAnnouncementHandler = (id: string) => {
    const tmpAnnouncements = [...getState().announcements];
    const index = tmpAnnouncements.findIndex((item) => item.id === id);

    if (index > -1) tmpAnnouncements.splice(index, 1);

    set({ announcements: tmpAnnouncements });
  };

  const addAnnouncementHandler = (
    title: string,
    severity: ToastsItemSeverity = toastsItemSeverityKeys.info,
    autoclose?: number | boolean
  ) => {
    const tmpAnnouncements = [...getState().announcements];
    const id = getRandomId();

    tmpAnnouncements.push({
      id,
      title,
      severity,
    });

    if (autoclose) {
      const timeout = typeof autoclose === 'number' ? autoclose : FEEDBACK_COMMON_TIMEOUT_DEFAULT;

      setTimeout(() => removeAnnouncementHandler(id), timeout);
    }

    set({ announcements: tmpAnnouncements });
  };

  const toggleProfileDialogHandler = () => {
    set({ profileDialogOpen: !getState().profileDialogOpen });
  };

  return {
    // Locale
    locale,
    setLocale: setLocalesHandler,
    // Theme mode
    mode,
    setMode: setModeHandler,
    // Toasts
    toasts,
    removeToast: removeToastHandler,
    addToast: addToastHandler,
    // Announcements
    announcements,
    addAnnouncement: addAnnouncementHandler,
    removeAnnouncement: removeAnnouncementHandler,

    profileDialogOpen,
    toggleProfileDialog: toggleProfileDialogHandler,
  };
});

export default useAppStore;
