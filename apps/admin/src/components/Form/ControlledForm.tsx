import { FormProvider, FieldValues, UseFormReturn } from 'react-hook-form';
import { ControlledFormProps } from './types';
import Form from './Form';

const ControlledForm = <T extends FieldValues>({ children, form, formProps }: ControlledFormProps<T>) => (
  <FormProvider {...(form as UseFormReturn<T>)}>
    <Form {...formProps}>{children}</Form>
  </FormProvider>
);

export default ControlledForm;
