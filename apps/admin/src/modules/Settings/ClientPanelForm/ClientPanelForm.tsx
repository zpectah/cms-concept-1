import { Button, Divider, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { registeredFormFields } from '../../../enums';
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
  ActionBar,
  PasswordField,
} from '../../../components';
import { useClientPanelForm } from './useClientPanelForm';

const ClientPanelForm = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { form, onSubmit, fieldOptions } = useClientPanelForm();

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <Content>
        <Section
          title={t('modules:settings.tabs.client.section.meta.title')}
          subtitle={t('modules:settings.tabs.client.section.meta.subtitle')}
          cardContent
          contentSpacing="form"
        >
          <InputField
            name={`${registeredFormFields.meta}.${registeredFormFields.title}`}
            label={t('modules:settings.tabs.client.section.meta.label.title')}
            isRequired
          />
          <TextareaField
            name={`${registeredFormFields.meta}.${registeredFormFields.description}`}
            label={t('modules:settings.tabs.client.section.meta.label.description')}
          />
          <SelectField
            name={`${registeredFormFields.meta}.${registeredFormFields.robots}`}
            label={t('modules:settings.tabs.client.section.meta.label.robots')}
            items={fieldOptions.metaRobots}
            fieldProps={{ sx: { width: { xs: '100%', md: '33%' } } }}
          />
          <StringPickerField
            name={`${registeredFormFields.meta}.${registeredFormFields.keywords}`}
            label={t('modules:settings.tabs.client.section.meta.label.keywords')}
            fieldProps={{ placeholder: t('modules:settings.tabs.client.section.meta.placeholder.keywords') }}
          />
        </Section>

        <Section
          title={t('modules:settings.tabs.client.section.email.title')}
          subtitle={t('modules:settings.tabs.client.section.email.subtitle')}
          cardContent
          contentSpacing="form"
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 8, md: 10 }}>
              <InputField
                name={`${registeredFormFields.email}.${registeredFormFields.smtp}.${registeredFormFields.host}`}
                label={t('modules:settings.tabs.client.section.email.label.host')}
                isRequired
              />
            </Grid>
            <Grid size={{ xs: 4, md: 2 }}>
              <InputField
                name={`${registeredFormFields.email}.${registeredFormFields.smtp}.${registeredFormFields.port}`}
                label={t('modules:settings.tabs.client.section.email.label.port')}
                isRequired
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <InputField
                name={`${registeredFormFields.email}.${registeredFormFields.smtp}.${registeredFormFields.username}`}
                label={t('modules:settings.tabs.client.section.email.label.username')}
                helperMessages={[t('modules:settings.tabs.client.section.email.helper.username')]}
                isRequired
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <PasswordField
                name={`${registeredFormFields.email}.${registeredFormFields.smtp}.${registeredFormFields.password}`}
                label={t('modules:settings.tabs.client.section.email.label.password')}
                helperMessages={[t('modules:settings.tabs.client.section.email.helper.password')]}
              />
            </Grid>
          </Grid>
        </Section>

        <Section title={t('modules:settings.tabs.client.section.comments.title')} cardContent contentSpacing="form">
          <SwitchField
            name={`${registeredFormFields.comments}.${registeredFormFields.active}`}
            fieldProps={{ label: t('modules:settings.tabs.client.section.comments.label.active') }}
          />
        </Section>

        <Section title={t('modules:settings.tabs.client.section.members.title')} cardContent contentSpacing="form">
          <SwitchField
            name={`${registeredFormFields.members}.${registeredFormFields.active}`}
            fieldProps={{ label: t('modules:settings.tabs.client.section.members.label.active') }}
          />
        </Section>

        <Section title={t('modules:settings.tabs.client.section.messages.title')} cardContent contentSpacing="form">
          <SwitchField
            name={`${registeredFormFields.messages}.${registeredFormFields.active}`}
            fieldProps={{ label: t('modules:settings.tabs.client.section.messages.label.active') }}
          />
        </Section>

        <Section
          title={t('modules:settings.tabs.client.section.states.title')}
          subtitle={t('modules:settings.tabs.client.section.states.subtitle')}
          cardContent
          contentSpacing="form"
        >
          <SwitchField
            name={`${registeredFormFields.state}.${registeredFormFields.debug}`}
            fieldProps={{ label: t('modules:settings.tabs.client.section.states.label.debugMode') }}
          />
          <SwitchField
            name={`${registeredFormFields.state}.${registeredFormFields.maintenance}`}
            fieldProps={{ label: t('modules:settings.tabs.client.section.states.label.maintenanceMode') }}
          />
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

export default ClientPanelForm;
