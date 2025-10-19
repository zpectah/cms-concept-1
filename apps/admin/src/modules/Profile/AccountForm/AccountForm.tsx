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
        <div>Avatar image maybe?</div>
        <EmailField name={registeredFormFields.email} label="Email" isRequired />
        <PasswordField name={registeredFormFields.password} label="New password" />
        <PasswordField
          name={registeredFormFields.passwordConfirm}
          label="Password confirm"
          isHidden={!watchedPassword}
        />
        <InputField name={registeredFormFields.firstName} label="First name" />
        <InputField name={registeredFormFields.lastName} label="Last name" />

        <ActionBar>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </ActionBar>
      </FormContent>
    </ControlledForm>
  );
};

export default AccountForm;
