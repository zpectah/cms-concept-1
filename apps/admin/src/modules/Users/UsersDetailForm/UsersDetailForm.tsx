import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { newItemKey, usersTypeDefault } from '@common';
import { registeredFormFields } from '../../../enums';
import { getConfig } from '../../../config';
import {
  ControlledForm,
  FormDetailSidebar,
  FormDetailActions,
  FormLayout,
  InputField,
  SelectField,
  EmailField,
  PasswordField,
} from '../../../components';
import { useUserActions } from '../../../hooks';
import { useUsersDetailForm } from './useUsersDetailForm';

const UsersDetailForm = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['common', 'form']);
  const { users: modelActions } = useUserActions();
  const { detailId, form, onSubmit, fieldOptions } = useUsersDetailForm();

  const created = useWatch({ name: registeredFormFields.created, control: form.control });
  const updated = useWatch({ name: registeredFormFields.updated, control: form.control });

  return (
    <ControlledForm key={detailId} form={form} formProps={{ onSubmit }}>
      <FormLayout
        actions={
          <FormDetailActions detailId={detailId} listPath={`/${routes.users.path}`} modelActions={modelActions} />
        }
        sidebar={<FormDetailSidebar detailId={detailId} created={created} updated={updated} />}
      >
        <EmailField name={registeredFormFields.email} label={t('form:label.email')} isRequired />
        <PasswordField
          name={registeredFormFields.password}
          label={t('form:label.password')}
          isRequired={detailId === newItemKey}
        />
        <InputField name={registeredFormFields.first_name} label={t('form:label.firstName')} />
        <InputField name={registeredFormFields.last_name} label={t('form:label.lastName')} />
        <InputField
          name={registeredFormFields.name}
          label={t('form:label.name')}
          isRequired
          readOnly={detailId !== newItemKey}
        />
        <SelectField
          name={registeredFormFields.type}
          label={t('form:label.type')}
          items={fieldOptions.type}
          fieldProps={{ defaultValue: usersTypeDefault, sx: { width: { xs: '100%', md: '33%' } } }}
        />
        <SelectField
          name={registeredFormFields.access_rights}
          label={t('form:label.accessRights')}
          items={fieldOptions.accessRights}
          fieldProps={{ defaultValue: usersTypeDefault, sx: { width: { xs: '100%', md: '33%' } } }}
        />
      </FormLayout>
    </ControlledForm>
  );
};

export default UsersDetailForm;
