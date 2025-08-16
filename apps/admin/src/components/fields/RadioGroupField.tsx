import { ControlledFormField } from '../FormField';
import { RadioGroup } from '../input';
import { RadioGroupFieldProps } from './types';

const RadioGroupField = ({ fieldProps, row, items = [], ...rest }: RadioGroupFieldProps) => (
  <ControlledFormField
    render={({ field }) => <RadioGroup row={row} items={items} {...fieldProps} {...field} />}
    {...rest}
  />
);

export default RadioGroupField;
