import { useSearchParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import { Footer, CmsLogo, Container } from '../components';
import { PasswordRecoveryForm, PasswordRecoveryTokenForm } from '../modules';

const PasswordRecoveryView = () => {
  const [searchParams] = useSearchParams();

  const paramToken = searchParams.get('token');

  return (
    <Stack direction="column" gap={4} alignItems="center">
      <CmsLogo disableLink />
      <Container>{paramToken ? <PasswordRecoveryTokenForm /> : <PasswordRecoveryForm />}</Container>
      <Footer />
    </Stack>
  );
};

export default PasswordRecoveryView;
