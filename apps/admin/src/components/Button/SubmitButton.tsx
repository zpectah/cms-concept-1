import { Button, ButtonProps } from '@mui/material';

type SubmitButtonProps = ButtonProps;

const SubmitButton = ({ children, ...rest }: SubmitButtonProps) => (
  <Button type="submit" variant="contained" color="primary" size="large" {...rest}>
    {children}
  </Button>
);

export default SubmitButton;
