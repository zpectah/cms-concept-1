import { Stack } from '@mui/material';
import { Footer, CmsLogo, Container } from '../components';
import { LoginForm } from '../modules';

const LoginView = () => {
  return (
    <Stack direction="column" gap={4} alignItems="center">
      <CmsLogo disableLink />
      <Container>
        <LoginForm />
      </Container>
      <Footer />
    </Stack>
  );
};

export default LoginView;
