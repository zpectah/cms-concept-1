import { SelectFieldProps } from '../../../components/fields/types';
import { ControlledFormField } from '../../../components';
import AttachmentsPicker from './AttachmentsPicker';

interface AttachmentsPickerFieldProps extends SelectFieldProps {
  ignored?: number[];
}

const CategoriesPickerField = ({
  fieldProps,
  items = [],
  defaultValue,
  multiple,
  ignored,
  ...rest
}: AttachmentsPickerFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => (
      <AttachmentsPicker
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
