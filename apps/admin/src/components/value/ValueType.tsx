import { Typography, TypographyProps } from '@mui/material';
import { getOptionValue } from '../../helpers';

interface ValueTypeProps {
  value: string;
  typographyProps?: Partial<TypographyProps>;
}

const ValueType = ({ value, typographyProps }: ValueTypeProps) => (
  <Typography variant="inherit" {...typographyProps}>
    {getOptionValue(value)}
  </Typography>
);

export default ValueType;
