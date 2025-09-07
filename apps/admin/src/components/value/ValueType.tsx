import { Chip, ChipProps } from '@mui/material';
import { getOptionValue } from '../../helpers';

interface ValueTypeProps {
  value: string;
  chipProps?: Partial<ChipProps>;
}

const ValueType = ({ value, chipProps }: ValueTypeProps) => (
  <Chip label={getOptionValue(value)} size="small" color="info" variant="outlined" {...chipProps} />
);

export default ValueType;
