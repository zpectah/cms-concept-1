import { useMemo, cloneElement } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormFieldProps } from './types';
import FormFieldBase from './FormFieldBase';

const FormField = ({
  name,
  field,
  fieldId,
  testId,
  label,
  isRequired,
  isDisabled,
  fieldOptions,
  outerBoxProps,
  helperMessages = [],
  errorMessages = [],
  ...rest
}: FormFieldProps) => {
  const form = useFormContext();

  const fieldErrorMessage = useMemo(() => form?.formState?.errors[name]?.message as string, [form?.formState, name]);

  if (!field) {
    throw new Error('Missing field element!');
  }

  return (
    <FormFieldBase
      name={name}
      label={label}
      helperMessages={helperMessages}
      errorMessages={[fieldErrorMessage ?? fieldErrorMessage, ...errorMessages]}
      outerBoxProps={outerBoxProps}
      isRequired={isRequired}
      {...rest}
    >
      {cloneElement(field, {
        ...form?.register(name, { required: isRequired, ...fieldOptions }),
        disabled: isDisabled,
        id: fieldId,
        error: !!fieldErrorMessage,
        'data-test-id': testId ?? name,
      } as object)}
    </FormFieldBase>
  );
};

export default FormField;
