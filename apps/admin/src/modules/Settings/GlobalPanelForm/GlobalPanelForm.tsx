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
  GpsPickerField,
} from '../../../components';
import { useGlobalPanelForm } from './useGlobalPanelForm';

const GlobalPanelForm = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { form, onSubmit } = useGlobalPanelForm();

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <Content>
        <Section
          title={t('modules:settings.tabs.global.section.project.title')}
          subtitle={t('modules:settings.tabs.global.section.project.subtitle')}
          cardContent
          contentSpacing="form"
        >
          <InputField
            name={`${registeredFormFields.project}.${registeredFormFields.name}`}
            label={t('modules:settings.tabs.global.section.project.label.name')}
            isRequired
          />
          <TextareaField
            name={`${registeredFormFields.project}.${registeredFormFields.description}`}
            label={t('modules:settings.tabs.global.section.project.label.description')}
          />
        </Section>
        <Section
          title={t('modules:settings.tabs.global.section.company.title')}
          subtitle={t('modules:settings.tabs.global.section.company.subtitle')}
          cardContent
          contentSpacing="form"
        >
          <InputField
            name={`${registeredFormFields.company}.${registeredFormFields.name}`}
            label={t('modules:settings.tabs.global.section.company.label.name')}
          />
          <TextareaField
            name={`${registeredFormFields.company}.${registeredFormFields.description}`}
            label={t('modules:settings.tabs.global.section.company.label.description')}
          />
          <InputField
            name={`${registeredFormFields.company}.${registeredFormFields.id}`}
            label={t('modules:settings.tabs.global.section.company.label.id')}
          />
          <EmailPickerField
            name={`${registeredFormFields.company}.${registeredFormFields.email}`}
            label={t('modules:settings.tabs.global.section.company.label.email')}
            fieldProps={{ placeholder: t('modules:settings.tabs.global.section.company.placeholder.email') }}
          />
          <PhonePickerField
            name={`${registeredFormFields.company}.${registeredFormFields.phone}`}
            label={t('modules:settings.tabs.global.section.company.label.phone')}
            fieldProps={{ placeholder: t('modules:settings.tabs.global.section.company.placeholder.phone') }}
          />
          <InputField
            name={`${registeredFormFields.company}.${registeredFormFields.bank}`}
            label={t('modules:settings.tabs.global.section.company.label.bank')}
          />
          <GpsPickerField
            name={`${registeredFormFields.company}.${registeredFormFields.location}`}
            label={t('form:label.gpsLocation')}
          />
          <AddressField fieldPrefix={`${registeredFormFields.company}.${registeredFormFields.address}`} disableCard />
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

export default GlobalPanelForm;
