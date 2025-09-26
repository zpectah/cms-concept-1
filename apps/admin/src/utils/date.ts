import dayjs from 'dayjs';
import i18next from 'i18next';

export const getFormattedDate = (string?: string, format?: string) => dayjs(string).format(format ?? 'DD.MM. YYYY');
export const getFormattedDateTime = (string?: string, format?: string) =>
  dayjs(string).format(format ?? 'DD.MM. YYYY hh:mm');
export const getFormattedTime = (string?: string, format?: string) => dayjs(string).format(format ?? 'hh:mm:ss');

export const getFormattedDateString = (value?: string, time?: boolean) =>
  dayjs(value).isToday()
    ? `${i18next.t('label.today')}${time ? ` ${getFormattedTime(value)}` : ''}`
    : dayjs(value).isYesterday()
    ? i18next.t('label.yesterday')
    : getFormattedDate(value);

// It might be confusing to type this, but we need keep this as undefined
export const getTypedDate = (date: dayjs.Dayjs | null | undefined) => dayjs(date) as unknown as undefined;
