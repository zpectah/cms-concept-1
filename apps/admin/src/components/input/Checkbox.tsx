import { forwardRef } from 'react';
import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';
import { CheckboxProps } from './types';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ inputProps, name, label, ...rest }, ref) => (
  <FormControlLabel name={name} control={<MuiCheckbox {...inputProps} />} label={label} inputRef={ref} {...rest} />
));

export default Checkbox;
