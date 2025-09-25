import { Button, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  ControlledForm,
  Content,
  Section,
  SubmitButton,
  InputField,
  EmailField,
  ThemeToggle,
  ActionBar,
  PasswordField,
} from '../../../components';
import { useAccountPanelForm } from './useAccountPanelForm';

const AccountPanelForm = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { form, onSubmit } = useAccountPanelForm();

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <Content>
        <Section title={t('modules:profile.tabs.account.section.basic.title')} cardContent contentSpacing="form">
          <InputField name="firstName" label="Jméno" isRequired />
          <InputField name="lastName" label="Příjmení" isRequired />
          <EmailField name="email" label="Váš e-mail" isRequired />
          <PasswordField name="password" label="Nové heslo" />
        </Section>
        <Section title={t('modules:profile.tabs.account.section.appearance.title')} cardContent contentSpacing="form">
          ...
          <br />
          <ThemeToggle />
        </Section>
        <Divider />
        <ActionBar>
          <SubmitButton>{t('button.saveChanges')}</SubmitButton>
          <Button type="reset" variant="outlined" color="inherit">
            {t('button.reset')}
          </Button>
        </ActionBar>
      </Content>
    </ControlledForm>
  );
};

export default AccountPanelForm;
