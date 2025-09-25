import { ControlledFormField } from '../FormField';
import { PhonePicker } from '../picker';
import { PhonePickerFieldProps } from './types';

const PhonePickerField = ({ fieldProps, isDisabled, isRequired, readOnly, ...rest }: PhonePickerFieldProps) => (
  <ControlledFormField
    isDisabled={isDisabled}
    isRequired={isRequired}
    render={({ field, fieldState }) => <PhonePicker isError={!!fieldState.error} {...fieldProps} {...field} />}
    {...rest}
  />
);

export default PhonePickerField;
