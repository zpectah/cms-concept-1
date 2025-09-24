import { StringPickerProps } from './types';
import BasePicker from './BasePicker';

const StringPicker = (props: StringPickerProps) => <BasePicker chipProps={{ color: 'info' }} {...props} />;

export default StringPicker;
