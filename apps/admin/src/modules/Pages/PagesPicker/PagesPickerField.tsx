import { SelectFieldProps } from '../../../components/fields/types';
import { ControlledFormField } from '../../../components';
import PagesPicker from './PagesPicker';

interface PagesPickerFieldProps extends SelectFieldProps {
  ignored?: number[];
}

const PagesPickerField = ({
  fieldProps,
  items = [],
  defaultValue,
  multiple,
  ignored,
  ...rest
}: PagesPickerFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => (
      <PagesPicker
        fullWidth
        multiple={multiple}
        ignored={ignored}
        error={!!fieldState.error}
        defaultValue={defaultValue ?? fieldProps?.defaultValue}
        {...fieldProps}
        {...field}
      />
    )}
    {...rest}
  />
);

export default PagesPickerField;
