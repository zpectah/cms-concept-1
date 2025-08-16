import { Button, ButtonProps } from '@mui/material';
import { Link } from 'react-router-dom';

type LinkButtonProps = ButtonProps & {
  to: string;
};

const LinkButton = ({ children, to, ...rest }: LinkButtonProps) => (
  <Button variant="outlined" color="inherit" component={Link} to={to} {...rest}>
    {children}
  </Button>
);

export default LinkButton;
