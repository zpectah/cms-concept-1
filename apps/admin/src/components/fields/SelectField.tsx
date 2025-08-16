import { ControlledFormField } from '../FormField';
import { Select } from '../input';
import { SelectFieldProps } from './types';

const SelectField = ({ fieldProps, items = [], defaultValue, isDisabled, isRequired, ...rest }: SelectFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => (
      <Select
        fullWidth
        error={!!fieldState.error}
        items={items}
        defaultValue={defaultValue ?? fieldProps?.defaultValue}
        disabled={isDisabled}
        required={isRequired}
        {...fieldProps}
        {...field}
      />
    )}
    {...rest}
  />
);

export default SelectField;
