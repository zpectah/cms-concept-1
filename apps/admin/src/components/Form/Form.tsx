import { forwardRef } from 'react';
import { FormProps } from './types';

const Form = forwardRef<HTMLFormElement, FormProps>(({ children, ...rest }, ref) => (
  <form noValidate autoComplete="off" {...rest} ref={ref}>
    {children}
  </form>
));

export default Form;
