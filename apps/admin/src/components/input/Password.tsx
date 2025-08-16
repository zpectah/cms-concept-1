import { forwardRef, useState } from 'react';
import { IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { PasswordProps } from './types';
import Input from './Input';

const Password = forwardRef<HTMLInputElement, PasswordProps>(({ disableIcon, disableToggle, ...rest }, ref) => {
  const [show, setShow] = useState(false);

  return (
    <Input
      type={show ? 'text' : 'password'}
      startAdornment={!disableIcon && <LockIcon />}
      endAdornment={
        !disableToggle && (
          <IconButton onClick={() => setShow(!show)}>{show ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>
        )
      }
      inputRef={ref}
      {...rest}
    />
  );
});

export default Password;
