import { Button, ButtonProps } from '@mui/material';

type SecondaryButtonProps = ButtonProps;

const SecondaryButton = ({ children, ...rest }: SecondaryButtonProps) => (
  <Button variant="outlined" color="inherit" {...rest}>
    {children}
  </Button>
);

export default SecondaryButton;
