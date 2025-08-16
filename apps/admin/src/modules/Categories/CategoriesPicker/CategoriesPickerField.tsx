import { SelectFieldProps } from '../../../components/fields/types';
import { ControlledFormField } from '../../../components';
import CategoriesPicker from './CategoriesPicker';

interface CategoriesPickerFieldProps extends SelectFieldProps {
  ignored?: number[];
}

const CategoriesPickerField = ({
  fieldProps,
  items = [],
  defaultValue,
  multiple,
  ignored,
  ...rest
}: CategoriesPickerFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => (
      <CategoriesPicker
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

export default CategoriesPickerField;
