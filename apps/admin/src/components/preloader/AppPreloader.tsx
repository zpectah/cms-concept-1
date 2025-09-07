import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const AppPreloader = () => (
  <Stack direction="column" alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
    <Stack alignItems="center" gap={4}>
      <CircularProgress size="2.5rem" />
    </Stack>
  </Stack>
);

export default AppPreloader;
