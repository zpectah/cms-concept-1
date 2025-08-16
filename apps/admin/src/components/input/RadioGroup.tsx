import { forwardRef } from 'react';
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup } from '@mui/material';
import { RadioGroupProps } from './types';
import Radio from './Radio';

const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ items = [], name, label, formControlProps, ...rest }, ref) => (
    <FormControl ref={ref} {...formControlProps}>
      {label && <FormLabel>{label}</FormLabel>}
      <MuiRadioGroup name={name} {...rest}>
        {items.map((item) => (
          <Radio key={item.name} {...item} />
        ))}
      </MuiRadioGroup>
    </FormControl>
  )
);

export default RadioGroup;
