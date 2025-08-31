import { Stack } from '@mui/material';
import { Input } from '../input';
import { StringPickerProps } from './types';

const StringPicker = ({ value, onChange }: StringPickerProps) => {
  return (
    <Stack>
      <Input fullWidth />
      ...StringPicker...
    </Stack>
  );
};

export default StringPicker;
