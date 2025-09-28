import { useTranslation } from 'react-i18next';
import { Button, Divider } from '@mui/material';
// import { registeredFormFields } from '../../../enums';
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
  ActionBar,
  DebugFormModel,
  GpsPickerField,
} from '../../../components';
import { useGlobalPanelForm } from './useGlobalPanelForm';

const GlobalPanelForm = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { form, onSubmit } = useGlobalPanelForm();

  // TODO

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <Content>
        <Section title={t('modules:settings.tabs.global.section.project.title')} cardContent contentSpacing="form">
          <InputField name="projectName" label="Název projektu" isRequired />
          <TextareaField name="projectDescription" label="Popis projektu" />
        </Section>
        <Divider />
        <Section title={t('modules:settings.tabs.global.section.company.title')} cardContent contentSpacing="form">
          <InputField name="companyName" label="Název společnosti" />
          <TextareaField name="companyDescription" label="Popis společnosti" />
          <InputField name="companyId" label="ID společnosti" />
          <EmailPickerField
            name="companyEmail"
            label="E-mail společnosti"
            fieldProps={{ placeholder: 'Zadejte e-mail' }}
          />
          <PhonePickerField
            name="companyPhone"
            label="Telefon společnosti"
            fieldProps={{ placeholder: 'Zadejte telefon' }}
          />
          <InputField name="companyBank" label="Bankovní spojení" />
          <AddressField fieldPrefix="companyAddress" disableCard />
          <GpsPickerField name="companyLocation" label={t('form:label.gpsLocation')} />
        </Section>
        <Divider />
        <ActionBar>
          <SubmitButton>{t('button.saveChanges')}</SubmitButton>
          <Button type="reset" variant="outlined" color="inherit">
            {t('button.reset')}
          </Button>
        </ActionBar>

        <DebugFormModel name="ClientPanelForm" />
      </Content>
    </ControlledForm>
  );
};

export default GlobalPanelForm;
