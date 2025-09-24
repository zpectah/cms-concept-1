import { Phone } from '../input';
import { PhonePickerProps } from './types';
import BasePicker from './BasePicker';

const PhonePicker = (props: PhonePickerProps) => (
  <BasePicker
    renderInput={(value, setValue) => (
      <Phone
        name="phone-picker-input"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        sx={{ width: { xs: '100%', md: '33%' } }}
      />
    )}
    {...props}
  />
);

export default PhonePicker;
