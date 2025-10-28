import { Stack } from '@mui/material';
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
  const { form, onSubmit, user } = useLoginForm();

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <Content stackProps={{ sx: { width: { xs: '100%', md: '500px' } } }}>
        <EmailField name={registeredFormFields.email} label="Email" isRequired />
        <PasswordField name={registeredFormFields.password} label="Password" isRequired />
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
          <SubmitButton>Submit</SubmitButton>
          <SecondaryButton type="reset">Reset</SecondaryButton>
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
          <LinkButton to={`/${routes.passwordRecovery.path}`} variant="text">
            Lost password?
          </LinkButton>
        </Stack>
        <div>{JSON.stringify(user, null, 2)}</div>
      </Content>
    </ControlledForm>
  );
};

export default LoginForm;
