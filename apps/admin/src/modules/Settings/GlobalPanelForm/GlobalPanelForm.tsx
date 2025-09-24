import { Stack, Button, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  ControlledForm,
  Content,
  Section,
  SubmitButton,
  InputField,
  TextareaField,
  EmailPickerField,
  PhonePickerField,
  AddressField,
} from '../../../components';
import { useGlobalPanelForm } from './useGlobalPanelForm';

const GlobalPanelForm = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { form, onSubmit } = useGlobalPanelForm();

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <Content>
        <Section title={t('modules:settings.tabs.global.section.project.title')} cardContent>
          <InputField name="projectName" label="Název projektu" isRequired />
          <TextareaField name="projectDescription" label="Popis projektu" />
        </Section>
        <Divider />
        <Section title={t('modules:settings.tabs.global.section.company.title')} cardContent>
          <InputField name="companyName" label="Název společnosti" />
          <TextareaField name="companyDescription" label="Popis společnosti" />
          <InputField name="companyId" label="ID společnosti" />
          <EmailPickerField name="companyEmail" label="EmailPickerField DEMO" />
          <PhonePickerField name="companyPhone" label="PhonePickerField DEMO" />
          <AddressField fieldPrefix="companyAddress" disableCard />
          <div>GPS lokalita TODO</div>
          <InputField name="companyBank" label="Bankovní spojení" />
        </Section>
        <Divider />
        <Stack direction="row" gap={2}>
          <SubmitButton>Save changes</SubmitButton>
          <Button type="reset" variant="outlined" color="inherit">
            Reset
          </Button>
        </Stack>
        <pre>
          <code>{JSON.stringify(form.watch(), null, 2)}</code>
        </pre>
      </Content>
    </ControlledForm>
  );
};

export default GlobalPanelForm;
