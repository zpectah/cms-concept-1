import { ControlledFormField } from '../FormField';
import { Phone } from '../input';
import { PhoneFieldProps } from './types';

const PhoneField = ({ fieldProps, isDisabled, isRequired, readOnly, ...rest }: PhoneFieldProps) => (
  <ControlledFormField
    isDisabled={isDisabled}
    isRequired={isRequired}
    render={({ field, fieldState }) => (
      <Phone
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

export default PhoneField;
