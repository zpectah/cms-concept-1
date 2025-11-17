import { forwardRef } from 'react';
import { Tooltip, Button } from '@mui/material';
import { ButtonPlusProps } from './types';

const ButtonPlus = forwardRef<HTMLButtonElement, ButtonPlusProps>(
  ({ tooltip, tooltipProps, disabled, ...rest }, ref) => {
    const buttonElement = <Button {...rest} disabled={disabled} ref={ref} />;

    if (!tooltip) return buttonElement;
    if (disabled) return buttonElement;

    return (
      <Tooltip title={tooltip} {...tooltipProps}>
        {buttonElement}
      </Tooltip>
    );
  }
);

export default ButtonPlus;
