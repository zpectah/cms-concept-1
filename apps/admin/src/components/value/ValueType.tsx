import { Chip, ChipProps } from '@mui/material';
import { getOptionValue } from '../../helpers';

interface ValueTypeProps {
  value: string;
  prefix?: string;
  chipProps?: Partial<ChipProps>;
}

const ValueType = ({ value, prefix, chipProps }: ValueTypeProps) => (
  <Chip label={getOptionValue(value, prefix)} size="small" color="info" variant="outlined" {...chipProps} />
);

export default ValueType;
