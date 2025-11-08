import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { membersTypeDefault } from '@common';
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
  AddressField,
  TextareaField,
} from '../../../components';
import { useMembersDetailForm } from './useMembersDetailForm';

const MembersDetailForm = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['common', 'form']);
  const { detailId, form, onSubmit, fieldOptions } = useMembersDetailForm();

  const created = useWatch({ name: registeredFormFields.created, control: form.control });
  const updated = useWatch({ name: registeredFormFields.updated, control: form.control });

  return (
    <ControlledForm key={detailId} form={form} formProps={{ onSubmit }}>
      <FormLayout
        actions={<FormDetailActions detailId={detailId} listPath={`/${routes.members.path}`} />}
        sidebar={<FormDetailSidebar detailId={detailId} created={created} updated={updated} />}
      >
        <InputField name={registeredFormFields.name} label={t('form:label.name')} isRequired />
        <SelectField
          name={registeredFormFields.type}
          label={t('form:label.type')}
          items={fieldOptions.type}
          fieldProps={{ defaultValue: membersTypeDefault, sx: { width: { xs: '100%', md: '33%' } } }}
        />
        <EmailField name={registeredFormFields.email} label={t('form:label.email')} isRequired />
        <PasswordField name={registeredFormFields.password} label={t('form:label.password')} />
        <InputField name={registeredFormFields.first_name} label={t('form:label.firstName')} />
        <InputField name={registeredFormFields.last_name} label={t('form:label.lastName')} />
        <AddressField fieldPrefix={registeredFormFields.address} />
        <InputField
          name={registeredFormFields.flat_no}
          label={t('form:label.flatNo')}
          fieldProps={{ sx: { width: { xs: '100%', md: '33%' } } }}
        />
        <TextareaField name={registeredFormFields.description} label={t('form:label.description')} />
      </FormLayout>
    </ControlledForm>
  );
};

export default MembersDetailForm;
