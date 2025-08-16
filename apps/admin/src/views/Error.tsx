import { Stack, Typography } from '@mui/material';
import { Footer } from '../components';

interface ErrorViewProps {
  code?: number;
}

const ErrorView = ({ code }: ErrorViewProps) => {
  return (
    <Stack direction="column" gap={4} alignItems="center">
      <Typography variant="h4">Error {code}</Typography>
      <Footer />
    </Stack>
  );
};

export default ErrorView;
