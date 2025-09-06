import { Button, Divider, Stack } from '@mui/material';
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
} from '../../../components';
import { useClientPanelForm } from './useClientPanelForm';

const ClientPanelForm = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { form, onSubmit, fieldOptions } = useClientPanelForm();

  // TODO

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <Content>
        <Section title={t('modules:settings.tabs.client.section.meta.title')} cardContent>
          <InputField name="metaTitle" label="Titulek aplikace" isRequired />
          <TextareaField name="metaDescription" label="Popis aplikace" />
          <InputField name="metaKeywords" label="Klíčová slova" />
          <SelectField name="metaRobots" label="Meta roboti" items={fieldOptions.metaRobots} />
        </Section>
        <Section title="Stavy" cardContent>
          <SwitchField name="stateDebug" fieldProps={{ label: 'Mód ladění' }} />
          <SwitchField name="stateMaintenance" fieldProps={{ label: 'Mód údržby' }} />
        </Section>
        <Section title="Zprávy" cardContent>
          <SwitchField name="messagesActive" fieldProps={{ label: 'Zprávy aktivní' }} />
          <InputField name="messagesRecipients" label="Příjemci zpráv" />
        </Section>
        <Section title="Komentáře" cardContent>
          <SwitchField name="commentsActive" fieldProps={{ label: 'Komentáře aktivní' }} />
          <SwitchField name="commentsAnonymous" fieldProps={{ label: 'Komentovat mohou i anonymní uživatelé' }} />
        </Section>
        <Section title="Members" cardContent>
          <SwitchField name="membersActive" fieldProps={{ label: 'Members aktivní' }} />
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

export default ClientPanelForm;
