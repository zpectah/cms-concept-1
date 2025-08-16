import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { getConfig } from '../../utils';
import { DateTimePickerProps } from './types';

const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>((props, ref) => {
  const {
    admin: {
      locale: { format },
    },
  } = getConfig();

  const {
    i18n: { language },
  } = useTranslation();

  return (
    <MuiDateTimePicker
      format={`${(format as Record<string, { date: string }>)[language].date} ${
        (format as Record<string, { time: string }>)[language].time
      }`}
      ampm={false}
      inputRef={ref}
      {...props}
    />
  );
});

export default DateTimePicker;
