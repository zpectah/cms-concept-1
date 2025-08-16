import { Button, ButtonProps } from '@mui/material';

type PrimaryButtonProps = ButtonProps;

const PrimaryButton = ({ children, ...rest }: PrimaryButtonProps) => (
  <Button variant="contained" color="primary" {...rest}>
    {children}
  </Button>
);

export default PrimaryButton;
