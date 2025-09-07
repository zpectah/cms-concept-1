import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface ValueBooleanProps {
  value?: boolean;
}

const ValueBoolean = ({ value }: ValueBooleanProps) => (value ? <VisibilityIcon /> : <VisibilityOffIcon />);

export default ValueBoolean;
