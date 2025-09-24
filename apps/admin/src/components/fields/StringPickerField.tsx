import { ControlledFormField } from '../FormField';
import { StringPicker } from '../picker';
import { StringPickerFieldProps } from './types';

const StringPickerField = ({ fieldProps, isDisabled, isRequired, readOnly, ...rest }: StringPickerFieldProps) => (
  <ControlledFormField
    isDisabled={isDisabled}
    isRequired={isRequired}
    render={({ field, fieldState }) => {
      return <StringPicker isError={!!fieldState.error} {...fieldProps} {...field} />;
    }}
    {...rest}
  />
);

export default StringPickerField;
