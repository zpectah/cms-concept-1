import { ControlledFormField } from '../FormField';
import { GpsPickerFieldProps } from './types';
import { GpsPicker } from '../GpsPicker';

const GpsPickerField = ({ fieldProps, isDisabled, isRequired, readOnly, ...rest }: GpsPickerFieldProps) => (
  <ControlledFormField
    isDisabled={isDisabled}
    isRequired={isRequired}
    render={({ field, fieldState }) => <GpsPicker isError={!!fieldState.error} {...fieldProps} {...field} />}
    {...rest}
  />
);

export default GpsPickerField;
