import { forwardRef } from 'react';
import { FormControlLabel, Radio as MuiRadio } from '@mui/material';
import { RadioProps } from './types';

const Radio = forwardRef<HTMLInputElement, RadioProps>(({ inputProps, name, label, ...rest }, ref) => (
  <FormControlLabel
    ref={ref}
    name={name}
    control={<MuiRadio {...inputProps} />}
    label={label}
    inputRef={ref}
    {...rest}
  />
));

export default Radio;
