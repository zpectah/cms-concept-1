import { SvgIconProps } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';

interface ValueBooleanProps {
  value?: boolean;
}

const ValueBoolean = ({ value }: ValueBooleanProps) => {
  const iconProps: Partial<SvgIconProps> = { fontSize: 'small' };

  return value ? <CheckIcon {...iconProps} /> : <RemoveIcon {...iconProps} />;
};

export default ValueBoolean;
