import dayjs from 'dayjs';

export const getFormattedDate = (string?: string, format?: string) => dayjs(string).format(format ?? 'DD.MM. YYYY');
export const getFormattedDateTime = (string?: string, format?: string) =>
  dayjs(string).format(format ?? 'DD.MM. YYYY hh:mm');
export const getFormattedTime = (string?: string, format?: string) => dayjs(string).format(format ?? 'hh:mm:ss');

// It might be confusing to type this, but we need keep this as undefined
export const getTypedDate = (date: dayjs.Dayjs | null | undefined) => dayjs(date) as unknown as undefined;
