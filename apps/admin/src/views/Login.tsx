import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import { Footer, CmsLogo, Container } from '../components';
import { LoginForm } from '../modules';

const LoginView = () => {
  const { t } = useTranslation(['modules']);

  return (
    <Stack direction="column" gap={4} alignItems="center">
      <CmsLogo disableLink />
      <Typography variant="h2">{t('modules:login.pageTitle')}</Typography>
      <Container>
        <LoginForm />
      </Container>
      <Footer />
    </Stack>
  );
};

export default LoginView;
