import { ControlledFormField } from '../FormField';
import { Select } from '../input';
import { SelectFieldProps } from './types';

const SelectField = ({
  fieldProps,
  items = [],
  defaultValue,
  isDisabled,
  isRequired,
  readOnly,
  ...rest
}: SelectFieldProps) => (
  <ControlledFormField
    isDisabled={isDisabled}
    isRequired={isRequired}
    render={({ field, fieldState }) => (
      <Select
        fullWidth
        error={!!fieldState.error}
        items={items}
        defaultValue={defaultValue ?? fieldProps?.defaultValue}
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

export default SelectField;
