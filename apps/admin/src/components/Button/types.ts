import { ButtonProps, IconButtonProps, TooltipProps } from '@mui/material';

export type ButtonPlusProps = ButtonProps & {
  tooltipProps?: Partial<TooltipProps>;
  tooltip?: string;
};

export type IconButtonPlusProps = IconButtonProps & {
  tooltipProps?: Partial<TooltipProps>;
  tooltip?: string;
};
