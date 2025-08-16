import { forwardRef } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { EmailProps } from './types';
import Input from './Input';

const Email = forwardRef<HTMLInputElement, EmailProps>(({ disableIcon, ...rest }, ref) => {
  return <Input type="email" startAdornment={!disableIcon && <MailOutlineIcon />} inputRef={ref} {...rest} />;
});

export default Email;
