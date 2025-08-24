import dayjs from 'dayjs';
import { ControlledFormField } from '../FormField';
import { DatePicker } from '../input';
import { DatePickerFieldProps } from './types';

const DatePickerField = ({ fieldProps, isDisabled, isRequired, readOnly, ...rest }: DatePickerFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => {
      const safeValue = field.value ? dayjs(field.value) : null;

      return (
        <DatePicker
          defaultValue={null}
          slotProps={{
            textField: { error: !!fieldState.error, fullWidth: true, disabled: isDisabled, required: isRequired },
          }}
          readOnly={readOnly}
          disabled={isDisabled}
          {...fieldProps}
          {...field}
          value={safeValue}
        />
      );
    }}
    {...rest}
  />
);

export default DatePickerField;
