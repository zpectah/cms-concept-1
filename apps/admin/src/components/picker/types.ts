import { ReactNode } from 'react';

interface PickerBaseProps {
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  isError?: boolean;
}

export interface BasePickerProps extends PickerBaseProps {
  renderValue?: (value: string, index: number) => ReactNode;
}

export type EmailPickerProps = PickerBaseProps & {};

export type PhonePickerProps = PickerBaseProps & {};

export type StringPickerProps = PickerBaseProps & {};
