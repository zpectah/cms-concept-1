import { forwardRef } from 'react';
import { Tooltip, IconButton } from '@mui/material';
import { IconButtonPlusProps } from './types';

const IconButtonPlus = forwardRef<HTMLButtonElement, IconButtonPlusProps>(({ tooltip, tooltipProps, ...rest }, ref) => {
  const buttonElement = <IconButton {...rest} ref={ref} />;

  if (!tooltip) return buttonElement;

  return (
    <Tooltip title={tooltip} {...tooltipProps}>
      {buttonElement}
    </Tooltip>
  );
});

export default IconButtonPlus;
