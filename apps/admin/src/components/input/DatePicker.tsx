import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { getConfig } from '../../utils';
import { DatePickerProps } from './types';

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  const {
    admin: {
      locale: { format },
    },
  } = getConfig();

  const {
    i18n: { language },
  } = useTranslation();

  return (
    <MuiDatePicker format={(format as Record<string, { date: string }>)[language].date} inputRef={ref} {...props} />
  );
});

export default DatePicker;
