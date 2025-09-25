import { Email } from '../input';
import { EmailPickerProps } from './types';
import BasePicker from './BasePicker';
import { isEmailValid } from '../../utils';

const EmailPicker = (props: EmailPickerProps) => (
  <BasePicker
    renderInput={(value, setValue, inputSx, placeholder, error) => (
      <Email
        name="email-picker-input"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        sx={{ ...inputSx }}
        placeholder={placeholder}
        error={error}
      />
    )}
    isValueValid={(value) => isEmailValid(value)}
    {...props}
  />
);

export default EmailPicker;
