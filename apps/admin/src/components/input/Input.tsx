import { forwardRef } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { InputProps } from './types';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ readOnly, startAdornment, endAdornment, inputAdornmentProps, slotProps, value, ...rest }, ref) => {
    const localProps = {
      input: {
        readOnly,
        startAdornment: startAdornment ? (
          <InputAdornment position="start" {...inputAdornmentProps}>
            {startAdornment}
          </InputAdornment>
        ) : undefined,
        endAdornment: endAdornment ? (
          <InputAdornment position="end" {...inputAdornmentProps}>
            {endAdornment}
          </InputAdornment>
        ) : undefined,
        sx: { fontFamily: '"JetBrains Mono Variable", monospace' },
        ...slotProps?.input,
      },
      ...slotProps,
    };

    return <TextField slotProps={localProps} ref={ref} value={value ?? ''} {...rest} />;
  }
);

export default Input;
