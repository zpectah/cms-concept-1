import { ControlledFormField } from '../FormField';
import { Input } from '../input';
import { InputFieldProps } from './types';

const InputField = ({ fieldProps, isDisabled, isRequired, readOnly, ...rest }: InputFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => (
      <Input
        fullWidth
        error={!!fieldState.error}
        disabled={isDisabled}
        required={isRequired}
        readOnly={readOnly}
        {...fieldProps}
        {...field}
      />
    )}
    {...rest}
  />
);

export default InputField;
