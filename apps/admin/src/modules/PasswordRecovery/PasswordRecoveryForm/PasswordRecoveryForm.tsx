import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import { ControlledForm, FormContent, EmailField, SubmitButton, SecondaryButton } from '../../../components';
import { registeredFormFields } from '../../../enums';
import { usePasswordRecoveryForm } from './usePasswordRecoveryForm';

const PasswordRecoveryForm = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { form, onSubmit } = usePasswordRecoveryForm();

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <FormContent>
        <Stack>
          <EmailField name={registeredFormFields.email} label={t('modules:login.label.email')} isRequired />
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
          <SubmitButton>Send request</SubmitButton>
          <SecondaryButton type="reset">{t('button.reset')}</SecondaryButton>
        </Stack>
      </FormContent>
    </ControlledForm>
  );
};

export default PasswordRecoveryForm;
