import { MenuItemProps } from '@mui/material';
import { FormFieldProps } from '../FormField';
import {
  DatePickerProps,
  DateTimePickerProps,
  SwitchProps,
  WysiwygProps,
  CheckboxProps,
  EmailProps,
  InputProps,
  NumberProps,
  NumberAltProps,
  PasswordProps,
  RadioGroupProps,
  SelectProps,
  TextareaProps,
  RadioItemProps,
  PhoneProps,
} from '../input';
import { EmailPickerProps, PhonePickerProps, StringPickerProps } from '../picker';
import { GpsPickerProps } from '../GpsPicker';

type FieldBase = Omit<FormFieldProps, 'field'> & { readOnly?: boolean; isHidden?: boolean };

export type DatePickerFieldProps = FieldBase & {
  fieldProps?: Partial<DatePickerProps>;
};

export type DateTimePickerFieldProps = FieldBase & {
  fieldProps?: Partial<DateTimePickerProps>;
};

export type SwitchFieldProps = FieldBase & {
  fieldProps?: Partial<SwitchProps>;
};

export type WysiwygFieldProps = FieldBase & {
  fieldProps?: Partial<WysiwygProps>;
};

export type CheckboxFieldProps = FieldBase & {
  fieldProps?: Partial<CheckboxProps>;
};

export type EmailFieldProps = FieldBase & {
  fieldProps?: Partial<EmailProps>;
};

export type PhoneFieldProps = FieldBase & {
  fieldProps?: Partial<PhoneProps>;
};

export type InputFieldProps = FieldBase & {
  fieldProps?: Partial<InputProps>;
};

export type NumberFieldProps = FieldBase & {
  fieldProps?: Partial<NumberProps>;
};

export type NumberAltFieldProps = FieldBase & {
  fieldProps?: Partial<NumberAltProps>;
};

export type PasswordFieldProps = FieldBase & {
  fieldProps?: Partial<PasswordProps>;
};

export type RadioGroupFieldProps = FieldBase & {
  fieldProps?: Partial<Omit<RadioGroupProps, 'items'>>;
  row?: boolean;
  items?: RadioItemProps[];
};

export type SelectFieldProps = FieldBase & {
  fieldProps?: Partial<Omit<SelectProps, 'items'>>;
  items?: MenuItemProps[];
  defaultValue?: never | never[];
  multiple?: boolean;
};

export type TextareaFieldProps = FieldBase & {
  fieldProps?: Partial<TextareaProps>;
};

export type EmailPickerFieldProps = FieldBase & {
  fieldProps?: Partial<EmailPickerProps>;
};

export type PhonePickerFieldProps = FieldBase & {
  fieldProps?: Partial<PhonePickerProps>;
};

export type StringPickerFieldProps = FieldBase & {
  fieldProps?: Partial<StringPickerProps>;
};

export type GpsPickerFieldProps = FieldBase & {
  fieldProps?: Partial<GpsPickerProps>;
};
