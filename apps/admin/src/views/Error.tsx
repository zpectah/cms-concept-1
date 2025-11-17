import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import { Footer, LinkButton } from '../components';
import { getConfig } from '../utils';

interface ErrorViewProps {
  code?: number;
  disableFooter?: boolean;
}

const ErrorView = ({ code, disableFooter }: ErrorViewProps) => {
  const {
    admin: { routes },
  } = getConfig();

  const { t } = useTranslation();

  const message: Record<number, string> = {
    404: t('message.error.404'),
    403: t('message.error.403'),
  };

  return (
    <Stack direction="column" gap={4} alignItems="center">
      <Typography variant="h2">Error {code}</Typography>
      {code && <Typography>{message[code]}</Typography>}
      <LinkButton to={`/${routes.dashboard.path}`}>{t('button.returnToHome')}</LinkButton>
      {!disableFooter && <Footer />}
    </Stack>
  );
};

export default ErrorView;
