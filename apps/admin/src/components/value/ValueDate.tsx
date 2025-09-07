import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import { Typography, TypographyProps } from '@mui/material';
import { getFormattedDate } from '../../utils';

interface ValueDateProps {
  value?: string;
  typographyProps?: Partial<TypographyProps>;
}

dayjs.extend(isToday);
dayjs.extend(isYesterday);

const ValueDate = ({ value, typographyProps }: ValueDateProps) => {
  const { t } = useTranslation();

  return (
    <Typography variant="inherit" {...typographyProps}>
      {dayjs(value).isToday()
        ? t('label.today')
        : dayjs(value).isYesterday()
        ? t('label.yesterday')
        : getFormattedDate(value)}
    </Typography>
  );
};

export default ValueDate;
