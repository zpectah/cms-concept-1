import { forwardRef } from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { PhoneProps } from './types';
import Input from './Input';

const Phone = forwardRef<HTMLInputElement, PhoneProps>(({ disableIcon, ...rest }, ref) => {
  return (
    <Input type="tel" inputMode="tel" startAdornment={!disableIcon && <LocalPhoneIcon />} inputRef={ref} {...rest} />
  );
});

export default Phone;
