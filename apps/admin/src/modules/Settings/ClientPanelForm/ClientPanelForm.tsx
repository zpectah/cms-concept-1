import { Button, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  ControlledForm,
  Content,
  Section,
  SubmitButton,
  InputField,
  TextareaField,
  SelectField,
  SwitchField,
  StringPickerField,
  EmailPickerField,
  ActionBar,
} from '../../../components';
import { useClientPanelForm } from './useClientPanelForm';

const ClientPanelForm = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { form, onSubmit, fieldOptions } = useClientPanelForm();

  // TODO

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <Content>
        <Section title={t('modules:settings.tabs.client.section.meta.title')} cardContent contentSpacing="form">
          <InputField name="metaTitle" label="Titulek aplikace" isRequired />
          <TextareaField name="metaDescription" label="Popis aplikace" />
          <SelectField
            name="metaRobots"
            label="Meta roboti"
            items={fieldOptions.metaRobots}
            fieldProps={{ sx: { width: { xs: '100%', md: '33%' } } }}
          />
          <StringPickerField name="metaKeywords" label="Klíčová slova" />
        </Section>
        <Section title="Stavy" cardContent contentSpacing="form">
          <SwitchField name="stateDebug" fieldProps={{ label: 'Mód ladění' }} />
          <SwitchField name="stateMaintenance" fieldProps={{ label: 'Mód údržby' }} />
        </Section>
        <Section title="Zprávy" cardContent contentSpacing="form">
          <SwitchField name="messagesActive" fieldProps={{ label: 'Zprávy aktivní' }} />
          <EmailPickerField name="messagesRecipients" label="Příjemci zpráv" />
        </Section>
        <Section title="Komentáře" cardContent contentSpacing="form">
          <SwitchField name="commentsActive" fieldProps={{ label: 'Komentáře aktivní' }} />
          <SwitchField name="commentsAnonymous" fieldProps={{ label: 'Komentovat mohou i anonymní uživatelé' }} />
        </Section>
        <Section title="Members" cardContent contentSpacing="form">
          <SwitchField name="membersActive" fieldProps={{ label: 'Members aktivní' }} />
        </Section>
        <Divider />
        <ActionBar>
          <SubmitButton>{t('button.saveChanges')}</SubmitButton>
          <Button type="reset" variant="outlined" color="inherit">
            {t('button.reset')}
          </Button>
        </ActionBar>
        <pre>
          <code>{JSON.stringify(form.watch(), null, 2)}</code>
        </pre>
      </Content>
    </ControlledForm>
  );
};

export default ClientPanelForm;
