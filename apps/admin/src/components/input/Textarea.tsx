import { forwardRef } from 'react';
import { TextareaProps } from './types';
import Input from './Input';
import { INPUT_TEXTAREA_DEFAULT_ROWS } from './constants';

const Textarea = forwardRef<HTMLInputElement, TextareaProps>(({ rows = INPUT_TEXTAREA_DEFAULT_ROWS, ...rest }, ref) => (
  <Input multiline rows={rows} inputRef={ref} {...rest} />
));

export default Textarea;
