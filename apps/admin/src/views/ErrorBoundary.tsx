import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Box, Stack, Typography, Button, styled } from '@mui/material';
import { LayoutBase } from '../components';

const Wrapper = styled('main')({
  width: '100%',
  flex: 1,
  overflowY: 'auto',
  flexDirection: 'column',
});

const Content = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  gap: theme.spacing(4),
}));

const ErrorBoundary = () => {
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = (error as { error?: { message?: string } })?.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <LayoutBase>
      <Wrapper>
        <Content>
          <Box sx={{ marginTop: 'auto', marginBottom: 'auto', textAlign: 'center' }}>
            <Stack gap={4}>
              <Typography variant="h1">ERROR</Typography>
              <Typography variant="h3">Sorry, an unexpected error has occurred</Typography>
              <Typography variant="h5">{errorMessage}</Typography>

              <div>
                <Button variant="outlined" size="large" component={Link} to="/">
                  Return
                </Button>
              </div>
            </Stack>
          </Box>
        </Content>
      </Wrapper>
    </LayoutBase>
  );
};

export default ErrorBoundary;
