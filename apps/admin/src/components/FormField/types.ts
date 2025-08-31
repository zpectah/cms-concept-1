import React, { ReactElement } from 'react';
import {
  RegisterOptions,
  FieldValues,
  UseFormStateReturn,
  ControllerFieldState,
  ControllerRenderProps,
} from 'react-hook-form';
import { BoxProps } from '@mui/material';
import { WithChildren } from '@common';
import { formFieldMessageSeverityKeys } from './enums';

export type FormFieldMessageSeverity = keyof typeof formFieldMessageSeverityKeys;

export interface FormFieldMessageProps extends WithChildren {
  severity?: FormFieldMessageSeverity;
}

export interface FormFieldBaseProps extends Partial<WithChildren> {
  name: string;
  label?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  helperMessages?: string[];
  successMessages?: string[];
  errorMessages?: string[];
  outerBoxProps?: Partial<BoxProps>;
  innerBoxProps?: Partial<BoxProps>;
}

export interface FormFieldProps extends Omit<FormFieldBaseProps, 'children'> {
  field: ReactElement;
  fieldId?: string;
  testId?: string;
  fieldOptions?: RegisterOptions;
}

export interface ControlledFormFieldProps extends Omit<FormFieldProps, 'field'> {
  render: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
  }) => React.ReactElement;
}
