import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import { Footer, CmsLogo, Container } from '../components';
import { PasswordRecoveryForm, PasswordRecoveryTokenForm } from '../modules';

const PasswordRecoveryView = () => {
  const { t } = useTranslation(['modules']);
  const [searchParams] = useSearchParams();

  const paramToken = searchParams.get('token');

  return (
    <Stack direction="column" gap={4} alignItems="center">
      <CmsLogo disableLink />
      <Typography variant="h2">{t('modules:passwordRecovery.pageTitle')}</Typography>
      <Container>{paramToken ? <PasswordRecoveryTokenForm /> : <PasswordRecoveryForm />}</Container>
      <Footer />
    </Stack>
  );
};

export default PasswordRecoveryView;
