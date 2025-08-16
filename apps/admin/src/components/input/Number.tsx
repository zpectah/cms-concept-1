import { forwardRef } from 'react';
import { NumberProps } from './types';
import Input from './Input';
import { INPUT_NUMBER_NUMERIC_PATTERN } from './constants';

const Number = forwardRef<HTMLInputElement, NumberProps>(({ pattern = INPUT_NUMBER_NUMERIC_PATTERN, ...rest }, ref) => (
  <Input inputMode="numeric" slotProps={{ htmlInput: { pattern } }} inputRef={ref} {...rest} />
));

export default Number;
