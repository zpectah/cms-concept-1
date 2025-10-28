import { Button } from '@mui/material';
import { registeredFormFields } from '../../../enums';
import { ControlledForm, InputField, PasswordField, EmailField, FormContent, ActionBar } from '../../../components';
import { useAccountForm } from './useAccountForm';

const AccountForm = () => {
  const { form, onSubmit } = useAccountForm();

  const watchedPassword = form.watch('password');

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <FormContent>
        {/* TODO: avatar image */}
        <EmailField name={registeredFormFields.email} label="Email" isRequired readOnly />
        <InputField name={registeredFormFields.first_name} label="First name" />
        <InputField name={registeredFormFields.last_name} label="Last name" />

        <div style={{ height: '20px' }} />

        <PasswordField name={registeredFormFields.password} label="New password" />
        <PasswordField
          name={registeredFormFields.passwordConfirm}
          label="Password confirm"
          isHidden={!watchedPassword}
        />

        <ActionBar stackProps={{ sx: { mt: 2 } }}>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </ActionBar>
      </FormContent>
    </ControlledForm>
  );
};

export default AccountForm;
