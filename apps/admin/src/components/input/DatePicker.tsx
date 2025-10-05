import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { getFormatByLocale } from '../../helpers';
import { DatePickerProps } from './types';

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  const {
    i18n: { language },
  } = useTranslation();

  const { date } = getFormatByLocale(language);

  return <MuiDatePicker format={date} inputRef={ref} {...props} />;
});

export default DatePicker;
