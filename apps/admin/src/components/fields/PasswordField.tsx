import { ControlledFormField } from '../FormField';
import { Password } from '../input';
import { PasswordFieldProps } from './types';

const PasswordField = ({ fieldProps, isDisabled, isRequired, readOnly, ...rest }: PasswordFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => (
      <Password
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

export default PasswordField;
