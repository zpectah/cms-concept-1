import { Phone } from '../input';
import { PhonePickerProps } from './types';
import BasePicker from './BasePicker';

const PhonePicker = (props: PhonePickerProps) => (
  <BasePicker
    renderInput={(value, setValue, inputSx, placeholder, error) => (
      <Phone
        name="phone-picker-input"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        sx={{ ...inputSx }}
        placeholder={placeholder}
        error={error}
      />
    )}
    {...props}
  />
);

export default PhonePicker;
