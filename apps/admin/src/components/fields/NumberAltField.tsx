import { ControlledFormField } from '../FormField';
import { NumberAlt } from '../input';
import { NumberAltFieldProps } from './types';

const NumberField = ({ fieldProps, isDisabled, isRequired, readOnly, ...rest }: NumberAltFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => (
      <NumberAlt
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
