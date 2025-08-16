import { ControlledFormField } from '../FormField';
import { Checkbox } from '../input';
import { CheckboxFieldProps } from './types';

const CheckboxField = ({ fieldProps, isDisabled, isRequired, ...rest }: CheckboxFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => (
      <Checkbox
        label={fieldProps?.label}
        checked={!!field.value}
        disabled={isDisabled}
        required={isRequired}
        {...fieldProps}
        {...field}
      />
    )}
    {...rest}
  />
);

export default CheckboxField;
