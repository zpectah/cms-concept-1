import { Stack, Button } from '@mui/material';
import { ControlledForm, EmailField, PasswordField } from '../../../components';
import { registeredFormFields } from '../../../enums';
import { useLoginForm } from './useLoginForm';

const LoginForm = () => {
  const { form, onSubmit } = useLoginForm();

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <Stack gap={2}>
        <EmailField name={registeredFormFields.email} label="Email" isRequired />
        <PasswordField name={registeredFormFields.password} label="Password" isRequired />
        <Stack>
          <Button type="submit">Submit</Button>
          <Button>Reset</Button>
        </Stack>
      </Stack>
    </ControlledForm>
  );
};

export default LoginForm;
