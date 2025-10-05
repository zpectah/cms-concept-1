import { useTranslation } from 'react-i18next';
import { Button, Divider } from '@mui/material';
import { registeredFormFields } from '../../../enums';
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
          <InputField
            name={`${registeredFormFields.project}.${registeredFormFields.name}`}
            label="Název projektu"
            isRequired
          />
          <TextareaField
            name={`${registeredFormFields.project}.${registeredFormFields.description}`}
            label="Popis projektu"
          />
        </Section>
        <Divider />
        <Section title={t('modules:settings.tabs.global.section.company.title')} cardContent contentSpacing="form">
          <InputField name={`${registeredFormFields.company}.${registeredFormFields.name}`} label="Název společnosti" />
          <TextareaField
            name={`${registeredFormFields.company}.${registeredFormFields.description}`}
            label="Popis společnosti"
          />
          <InputField name={`${registeredFormFields.company}.${registeredFormFields.id}`} label="ID společnosti" />
          <EmailPickerField
            name={`${registeredFormFields.company}.${registeredFormFields.email}`}
            label="E-mail společnosti"
            fieldProps={{ placeholder: 'Zadejte e-mail' }}
          />
          <PhonePickerField
            name={`${registeredFormFields.company}.${registeredFormFields.phone}`}
            label="Telefon společnosti"
            fieldProps={{ placeholder: 'Zadejte telefon' }}
          />
          <InputField name={`${registeredFormFields.company}.${registeredFormFields.bank}`} label="Bankovní spojení" />
          <AddressField fieldPrefix={`${registeredFormFields.company}.${registeredFormFields.address}`} disableCard />
          <GpsPickerField
            name={`${registeredFormFields.company}.${registeredFormFields.location}`}
            label={t('form:label.gpsLocation')}
          />
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
