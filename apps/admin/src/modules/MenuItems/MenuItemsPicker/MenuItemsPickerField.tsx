import { SelectFieldProps } from '../../../components/fields/types';
import { ControlledFormField } from '../../../components';
import MenuItemsPicker from './MenuItemsPicker';

interface MenuItemsPickerFieldProps extends SelectFieldProps {
  ignored?: number[];
  menuId: string;
}

const MenuItemsPickerField = ({
  fieldProps,
  items = [],
  defaultValue,
  multiple,
  ignored,
  menuId,
  ...rest
}: MenuItemsPickerFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => (
      <MenuItemsPicker
        fullWidth
        multiple={multiple}
        ignored={ignored}
        error={!!fieldState.error}
        defaultValue={defaultValue ?? fieldProps?.defaultValue}
        menuId={menuId}
        {...fieldProps}
        {...field}
      />
    )}
    {...rest}
  />
);

export default MenuItemsPickerField;
