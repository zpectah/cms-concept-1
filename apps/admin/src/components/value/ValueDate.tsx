import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import { Typography, TypographyProps } from '@mui/material';
import { getFormattedDateString } from '../../utils';

interface ValueDateProps {
  value?: string;
  typographyProps?: Partial<TypographyProps>;
}

dayjs.extend(isToday);
dayjs.extend(isYesterday);

const ValueDate = ({ value, typographyProps }: ValueDateProps) => (
  <Typography variant="inherit" {...typographyProps}>
    {getFormattedDateString(value)}
  </Typography>
);

export default ValueDate;
