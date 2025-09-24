import { ReactNode } from 'react';
import { ChipProps, StackProps } from '@mui/material';

interface PickerBaseProps {
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  isError?: boolean;
  chipProps?: Partial<ChipProps>;
  stackProps?: Partial<StackProps>;
}

export interface BasePickerProps extends PickerBaseProps {
  renderValue?: (value: string, index: number) => ReactNode;
  renderInput?: (value: string, setValue: (value: string) => void) => ReactNode;
  isValueValid?: (value: string) => boolean;
}

export type EmailPickerProps = PickerBaseProps & {};

export type PhonePickerProps = PickerBaseProps & {};

export type StringPickerProps = PickerBaseProps & {};
