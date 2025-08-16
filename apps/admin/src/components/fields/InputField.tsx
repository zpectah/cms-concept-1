import { ControlledFormField } from '../FormField';
import { Input } from '../input';
import { InputFieldProps } from './types';

const InputField = ({ fieldProps, isDisabled, isRequired, ...rest }: InputFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => (
      <Input
        fullWidth
        error={!!fieldState.error}
        disabled={isDisabled}
        required={isRequired}
        {...fieldProps}
        {...field}
      />
    )}
    {...rest}
  />
);

export default InputField;
