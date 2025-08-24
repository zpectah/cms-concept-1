import { ControlledFormField } from '../FormField';
import { Email } from '../input';
import { EmailFieldProps } from './types';

const EmailField = ({ fieldProps, isDisabled, isRequired, readOnly, ...rest }: EmailFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => (
      <Email
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

export default EmailField;
