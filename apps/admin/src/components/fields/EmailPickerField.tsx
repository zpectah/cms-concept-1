import { ControlledFormField } from '../FormField';
import { EmailPicker } from '../picker';
import { EmailPickerFieldProps } from './types';

const EmailPickerField = ({ fieldProps, isDisabled, isRequired, readOnly, ...rest }: EmailPickerFieldProps) => (
  <ControlledFormField
    isDisabled={isDisabled}
    isRequired={isRequired}
    render={({ field, fieldState }) => {
      return <EmailPicker isError={!!fieldState.error} {...fieldProps} {...field} />;
    }}
    {...rest}
  />
);

export default EmailPickerField;
