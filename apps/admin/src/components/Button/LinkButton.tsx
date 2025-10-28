import { Button, ButtonProps } from '@mui/material';
import { Link } from 'react-router-dom';

type LinkButtonProps = ButtonProps & {
  to: string;
};

const LinkButton = ({ children, to, variant, ...rest }: LinkButtonProps) => (
  <Button variant={variant ? variant : 'outlined'} color="inherit" component={Link} to={to} {...rest}>
    {children}
  </Button>
);

export default LinkButton;
