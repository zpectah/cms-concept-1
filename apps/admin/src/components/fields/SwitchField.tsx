import { ControlledFormField } from '../FormField';
import { Switch } from '../input';
import { SwitchFieldProps } from './types';

const SwitchField = ({ fieldProps, isDisabled, isRequired, ...rest }: SwitchFieldProps) => (
  <ControlledFormField
    render={({ field }) => (
      <Switch
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

export default SwitchField;
