import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { newItemKey, usersTypeDefault } from '@common';
import { registeredFormFields } from '../../../enums';
import { getConfig } from '../../../utils';
import {
  ControlledForm,
  FormDetailSidebar,
  FormDetailActions,
  FormLayout,
  InputField,
  SelectField,
  EmailField,
  PasswordField,
  NumberField,
} from '../../../components';
import { useUsersDetailForm } from './useUsersDetailForm';

const UsersDetailForm = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['common', 'form']);
  const { detailId, form, onSubmit, fieldOptions } = useUsersDetailForm();

  const created = useWatch({ name: registeredFormFields.created, control: form.control });
  const updated = useWatch({ name: registeredFormFields.updated, control: form.control });

  return (
    <ControlledForm key={detailId} form={form} formProps={{ onSubmit }}>
      <FormLayout
        actions={<FormDetailActions detailId={detailId} listPath={`/${routes.users.path}`} />}
        sidebar={<FormDetailSidebar detailId={detailId} created={created} updated={updated} />}
      >
        <InputField name={registeredFormFields.name} label={t('form:label.name')} />
        <SelectField
          name={registeredFormFields.type}
          label={t('form:label.type')}
          items={fieldOptions.type}
          fieldProps={{ defaultValue: usersTypeDefault, sx: { width: { xs: '100%', md: '33%' } } }}
        />
        <EmailField name={registeredFormFields.email} label={t('form:label.email')} />

        {/* TODO - Jen pokud je nový */}
        <PasswordField
          name={registeredFormFields.password}
          label={t('form:label.password')}
          isRequired={detailId === newItemKey}
        />

        <InputField name={registeredFormFields.firstName} label={t('form:label.firstName')} />
        <InputField name={registeredFormFields.lastName} label={t('form:label.lastName')} />

        <NumberField
          name={registeredFormFields.accessLevel}
          label={t('form:label.accessLevel')}
          fieldProps={{ sx: { width: { xs: '100%', md: '33%' } } }}
        />
      </FormLayout>
    </ControlledForm>
  );
};

export default UsersDetailForm;
