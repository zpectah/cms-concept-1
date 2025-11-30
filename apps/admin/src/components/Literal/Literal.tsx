import { ReactNode } from 'react';
import { Stack, Typography, StackProps } from '@mui/material';
import { Label } from '../Label';

interface LiteralProps extends StackProps {
  label: string;
  value?: ReactNode;
  hidden?: boolean;
}

const Literal = ({ label, value, hidden, ...rest }: LiteralProps) => {
  if (hidden) return null;

  return (
    <Stack {...rest}>
      <Label>{label}</Label>
      <Typography variant="h5" sx={{ fontSize: '1rem' }}>
        {value ?? '?'}
      </Typography>
    </Stack>
  );
};

export default Literal;
