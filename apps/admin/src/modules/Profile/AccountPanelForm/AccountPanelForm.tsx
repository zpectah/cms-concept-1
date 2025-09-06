import { Stack, Button, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  ControlledForm,
  Content,
  Section,
  SubmitButton,
  InputField,
  EmailField,
  ThemeToggle,
} from '../../../components';
import { useAccountPanelForm } from './useAccountPanelForm';

const AccountPanelForm = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { form, onSubmit } = useAccountPanelForm();

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <Content>
        <Section title={t('modules:profile.tabs.account.section.basic.title')} cardContent>
          <InputField name="firstName" label="Jméno" isRequired />
          <InputField name="lastName" label="Příjmení" isRequired />
          <EmailField name="email" label="Váš e-mail" isRequired />
        </Section>
        <Section title={t('modules:profile.tabs.account.section.appearance.title')} cardContent>
          ...
          <br />
          <ThemeToggle />
        </Section>
        <Divider />
        <Stack direction="row" gap={2}>
          <SubmitButton>Save changes</SubmitButton>
          <Button type="reset" variant="outlined" color="inherit">
            Reset
          </Button>
        </Stack>
      </Content>
    </ControlledForm>
  );
};

export default AccountPanelForm;
