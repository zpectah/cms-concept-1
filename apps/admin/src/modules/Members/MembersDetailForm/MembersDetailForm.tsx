import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
} from '../../../components';
import { useMembersDetailForm } from './useMembersDetailForm';

const MembersDetailForm = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['common', 'form']);
  const { detailId, form, onSubmit, typeFieldDefault, typeFieldOptions } = useMembersDetailForm();

  const created = useWatch({ name: registeredFormFields.created, control: form.control });
  const updated = useWatch({ name: registeredFormFields.updated, control: form.control });

  return (
    <ControlledForm key={detailId} form={form} formProps={{ onSubmit }}>
      <FormLayout
        actions={<FormDetailActions detailId={detailId} listPath={`/${routes.members.path}`} />}
        sidebar={<FormDetailSidebar detailId={detailId} created={created} updated={updated} />}
      >
        <InputField name={registeredFormFields.name} label={t('form:label.name')} />
        <SelectField
          name={registeredFormFields.type}
          label={t('form:label.type')}
          items={typeFieldOptions}
          fieldProps={{ defaultValue: typeFieldDefault }}
        />
        <EmailField name={registeredFormFields.email} label={t('form:label.email')} />

        {/* TODO - Jen pokud je nový */}
        <PasswordField name={registeredFormFields.password} label={t('form:label.password')} />

        <InputField name={registeredFormFields.firstName} label={t('form:label.firstName')} />
        <InputField name={registeredFormFields.lastName} label={t('form:label.lastName')} />

        <AddressField />
      </FormLayout>
    </ControlledForm>
  );
};

export default MembersDetailForm;
