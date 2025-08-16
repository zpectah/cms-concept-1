import { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormElement, WithChildren } from '@common';

export type FormProps = FormElement;

export interface ControlledFormProps<T extends FieldValues> extends WithChildren {
  form: UseFormReturn<T>;
  formProps?: Partial<Omit<FormProps, 'children'>>;
}
