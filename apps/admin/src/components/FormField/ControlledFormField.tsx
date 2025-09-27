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
  isHidden,
  defaultValue,
  ...rest
}: ControlledFormFieldProps) => {
  const form = useFormContext();

  if (isHidden) return null;

  return (
    <Controller
      name={name}
      control={form.control}
      rules={{ required: isRequired }}
      defaultValue={defaultValue}
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
