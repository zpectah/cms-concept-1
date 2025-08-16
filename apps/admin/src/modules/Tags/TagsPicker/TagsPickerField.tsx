import { SelectFieldProps } from '../../../components/fields/types';
import { ControlledFormField } from '../../../components';
import TagsPicker from './TagsPicker';

interface TagsPickerFieldProps extends SelectFieldProps {
  ignored?: number[];
}

const TagsPickerField = ({
  fieldProps,
  items = [],
  defaultValue,
  multiple,
  ignored,
  ...rest
}: TagsPickerFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => (
      <TagsPicker
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

export default TagsPickerField;
