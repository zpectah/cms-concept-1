import { Suspense } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { WithChildren } from '@common';
import { AppPreloader } from '../components';
import theme from '../styles/theme';

type AppProviderProps = WithChildren;

const queryClient = new QueryClient();

const AppProvider = ({ children }: AppProviderProps) => (
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<AppPreloader />}>{children}</Suspense>
      </ThemeProvider>
    </LocalizationProvider>
  </QueryClientProvider>
);

export default AppProvider;
