import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import { ControlledForm, FormContent, PasswordField, SecondaryButton, SubmitButton } from '../../../components';
import { registeredFormFields } from '../../../enums';
import { usePasswordRecoveryTokenForm } from './usePasswordRecoveryTokenForm';

const PasswordRecoveryTokenForm = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { form, onSubmit, tokenError } = usePasswordRecoveryTokenForm();

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <FormContent>
        <Stack direction="column" gap={2}>
          <PasswordField name={registeredFormFields.password} label={t('modules:login.label.password')} isRequired />
          <PasswordField
            name={registeredFormFields.passwordConfirm}
            label={t('modules:login.label.passwordConfirm')}
            isRequired
          />
          {tokenError && <Typography>Provided token is not valid</Typography>}
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
          <SubmitButton>Change password</SubmitButton>
          <SecondaryButton type="reset">{t('button.reset')}</SecondaryButton>
        </Stack>
      </FormContent>
    </ControlledForm>
  );
};

export default PasswordRecoveryTokenForm;
