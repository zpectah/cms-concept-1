import { Stack, Typography, StackProps } from '@mui/material';
import { Label } from '../Label';

interface LiteralProps extends StackProps {
  label: string;
  value?: string;
}

const Literal = ({ label, value, ...rest }: LiteralProps) => (
  <Stack {...rest}>
    <Label>{label}</Label>
    <Typography variant="h5" sx={{ fontSize: '1rem' }}>
      {value ?? '?'}
    </Typography>
  </Stack>
);

export default Literal;
