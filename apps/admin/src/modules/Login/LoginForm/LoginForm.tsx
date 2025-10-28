import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import { getConfig } from '../../../utils';
import {
  ControlledForm,
  EmailField,
  PasswordField,
  SubmitButton,
  SecondaryButton,
  LinkButton,
  Content,
} from '../../../components';
import { registeredFormFields } from '../../../enums';
import { useLoginForm } from './useLoginForm';

const LoginForm = () => {
  const {
    admin: { routes },
  } = getConfig();

  const { t } = useTranslation(['common', 'modules']);
  const { form, onSubmit, user } = useLoginForm();

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      {user?.active ? (
        <Content stackProps={{ sx: { textAlign: 'center' } }}>
          <Typography>{t('modules:login.button.alreadyLoggedAs', { email: user.user?.email })}</Typography>
          <div>
            <LinkButton to={`/${routes.dashboard.path}`} variant="text">
              {t('modules:login.button.returnToDashboard')}
            </LinkButton>
          </div>
        </Content>
      ) : (
        <Content stackProps={{ sx: { width: { xs: '100%', md: '500px' } } }}>
          <EmailField name={registeredFormFields.email} label={t('modules:login.label.email')} isRequired />
          <PasswordField name={registeredFormFields.password} label={t('modules:login.label.password')} isRequired />
          <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
            <SubmitButton>{t('modules:login.button.submit')}</SubmitButton>
            <SecondaryButton type="reset">{t('button.reset')}</SecondaryButton>
          </Stack>
          <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
            <LinkButton to={`/${routes.passwordRecovery.path}`}>{t('modules:login.button.lostPassword')}</LinkButton>
          </Stack>
        </Content>
      )}
    </ControlledForm>
  );
};

export default LoginForm;
