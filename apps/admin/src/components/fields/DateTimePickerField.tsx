import dayjs from 'dayjs';
import { ControlledFormField } from '../FormField';
import { DateTimePicker } from '../input';
import { DateTimePickerFieldProps } from './types';

const DateTimePickerField = ({ fieldProps, isDisabled, isRequired, readOnly, ...rest }: DateTimePickerFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => {
      const safeValue = field.value ? dayjs(field.value) : null;

      return (
        <DateTimePicker
          defaultValue={null}
          slotProps={{
            textField: { error: !!fieldState.error, fullWidth: true, disabled: isDisabled, required: isRequired },
          }}
          disabled={isDisabled}
          readOnly={readOnly}
          {...fieldProps}
          {...field}
          value={safeValue}
        />
      );
    }}
    {...rest}
  />
);

export default DateTimePickerField;
