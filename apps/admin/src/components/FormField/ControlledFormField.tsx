import { useFormContext, Controller } from 'react-hook-form';
import { FormFieldBase } from '../FormField';
import { ControlledFormFieldProps } from './types';

const ControlledFormField = ({
  name,
  fieldId,
  testId,
  label,
  errorMessages = [],
  render,
  isRequired,
  isDisabled,
  ...rest
}: ControlledFormFieldProps) => {
  const form = useFormContext();

  return (
    <Controller
      name={name}
      control={form.control}
      rules={{ required: isRequired }}
      render={({ field, fieldState, formState }) => {
        const fieldErrorMessage = fieldState.error?.message;
        const fieldErrorMessages: string[] = [...errorMessages];

        if (fieldErrorMessage) fieldErrorMessages.push(fieldErrorMessage);

        return (
          <FormFieldBase
            name={field.name}
            label={label}
            errorMessages={fieldErrorMessages}
            isRequired={isRequired}
            isDisabled={isDisabled}
            {...rest}
          >
            {render({ field, fieldState, formState })}
          </FormFieldBase>
        );
      }}
    />
  );
};

export default ControlledFormField;
