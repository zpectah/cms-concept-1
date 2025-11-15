import { useTranslation } from 'react-i18next';
import { Stack, Alert } from '@mui/material';
import { ControlledForm, FormContent, EmailField, SubmitButton, SecondaryButton } from '../../../components';
import { registeredFormFields } from '../../../enums';
import { usePasswordRecoveryForm } from './usePasswordRecoveryForm';

const PasswordRecoveryForm = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { form, onSubmit } = usePasswordRecoveryForm();

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <FormContent stackProps={{ sx: { width: { xs: '100%', md: '500px' } } }}>
        <Alert icon={false} severity="info">
          {t('modules:passwordRecovery.message.emailInboxTokenInfo')}
        </Alert>
        <Stack>
          <EmailField name={registeredFormFields.email} label={t('modules:login.label.email')} isRequired />
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
          <SubmitButton>{t('modules:passwordRecovery.button.sendRequest')}</SubmitButton>
          <SecondaryButton type="reset">{t('button.reset')}</SecondaryButton>
        </Stack>
      </FormContent>
    </ControlledForm>
  );
};

export default PasswordRecoveryForm;
