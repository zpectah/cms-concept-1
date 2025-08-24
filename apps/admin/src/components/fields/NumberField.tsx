import { ControlledFormField } from '../FormField';
import { Number } from '../input';
import { NumberFieldProps } from './types';

const NumberField = ({ fieldProps, isDisabled, isRequired, readOnly, ...rest }: NumberFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => (
      <Number
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

export default NumberField;
