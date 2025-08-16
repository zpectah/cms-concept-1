import { ReactNode } from 'react';
import {
  TextFieldProps,
  InputAdornmentProps,
  MenuItemProps,
  FormControlLabelProps,
  FormControlProps,
  SelectProps as MuiSelectProps,
  SwitchProps as MuiSwitchProps,
  CheckboxProps as MuiCheckboxProps,
  RadioProps as MuiRadioProps,
  RadioGroupProps as MuiRadioGroupProps,
} from '@mui/material';
import { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { DateTimePickerProps as MuiDateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { ContentEditableEvent } from 'react-simple-wysiwyg';

type InputLabelBaseProps = Omit<FormControlLabelProps, 'control'>;

export type InputProps = { readOnly?: boolean } & Partial<TextFieldProps> & {
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
    inputAdornmentProps?: Partial<InputAdornmentProps>;
  };

export type NumberProps = InputProps & {
  pattern?: string;
};

export type EmailProps = Omit<InputProps, 'type'> & { disableIcon?: boolean };

export type SearchProps = Omit<InputProps, 'type'> & { disableIcon?: boolean };

export type PasswordProps = Omit<InputProps, 'type'> & {
  disableIcon?: boolean;
  disableToggle?: boolean;
};

export type SelectProps = {
  items?: MenuItemProps[];
  readOnly?: boolean;
} & Partial<MuiSelectProps>;

export type SwitchProps = InputLabelBaseProps & {
  inputProps?: Partial<MuiSwitchProps>;
  name: string;
};

export type CheckboxProps = InputLabelBaseProps & {
  inputProps?: Partial<MuiCheckboxProps>;
  name: string;
};

export type RadioProps = InputLabelBaseProps & {
  inputProps?: Partial<MuiRadioProps>;
  name: string;
};

export type RadioItemProps = Omit<RadioProps, 'ref'>;

export interface RadioGroupProps extends MuiRadioGroupProps {
  items?: RadioItemProps[];
  name: string;
  label?: string;
  formControlProps?: Partial<FormControlProps>;
}

export interface WysiwygProps {
  name: string;
  value?: string;
  onChange?: (value: string, event: ContentEditableEvent) => void;
  isError?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export type DatePickerProps = MuiDatePickerProps<never> & {};

export type DateTimePickerProps = MuiDateTimePickerProps<never> & {};

export type TextareaProps = Omit<InputProps, 'type' | 'multiline'> & {};

export type NumberAltProps = Omit<NumberProps, 'onChange' | 'startAdornment' | 'endAdornment'> & {
  onChange?: (value: number) => void;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  centered?: boolean;
};
