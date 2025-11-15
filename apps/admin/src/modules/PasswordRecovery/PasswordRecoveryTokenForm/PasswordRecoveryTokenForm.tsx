import { useTranslation } from 'react-i18next';
import { Stack, Alert } from '@mui/material';
import { ControlledForm, FormContent, PasswordField, SecondaryButton, SubmitButton } from '../../../components';
import { registeredFormFields } from '../../../enums';
import { usePasswordRecoveryTokenForm } from './usePasswordRecoveryTokenForm';

const PasswordRecoveryTokenForm = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { form, onSubmit, tokenError } = usePasswordRecoveryTokenForm();

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <FormContent stackProps={{ sx: { width: { xs: '100%', md: '500px' } } }}>
        <Stack direction="column" gap={2}>
          <PasswordField
            name={registeredFormFields.password}
            label={t('modules:passwordRecovery.label.password')}
            isRequired
          />
          <PasswordField
            name={registeredFormFields.passwordConfirm}
            label={t('modules:passwordRecovery.label.passwordConfirm')}
            isRequired
          />
          {tokenError && (
            <Alert icon={false} severity="error">
              {t('modules:passwordRecovery.message.tokenIsNotValid')}
            </Alert>
          )}
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
          <SubmitButton>{t('modules:passwordRecovery.button.changePassword')}</SubmitButton>
          <SecondaryButton type="reset">{t('button.reset')}</SecondaryButton>
        </Stack>
      </FormContent>
    </ControlledForm>
  );
};

export default PasswordRecoveryTokenForm;
