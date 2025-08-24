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
  TextareaField,
} from '../../../components';
import { useMessagesDetailForm } from './useMessagesDetailForm';

const MessagesDetailForm = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['common', 'form']);
  const { detailId, form, onSubmit, typeFieldDefault, typeFieldOptions } = useMessagesDetailForm();

  const created = useWatch({ name: registeredFormFields.created, control: form.control });
  const updated = useWatch({ name: registeredFormFields.updated, control: form.control });

  // TODO - pokud bude ID - tak zamknout editaci (readonly?)

  return (
    <ControlledForm key={detailId} form={form} formProps={{ onSubmit }}>
      <FormLayout
        actions={<FormDetailActions detailId={detailId} listPath={`/${routes.messages.path}`} />}
        sidebar={<FormDetailSidebar detailId={detailId} created={created} updated={updated} />}
      >
        <InputField name={registeredFormFields.name} label={t('form:label.name')} />
        <SelectField
          name={registeredFormFields.type}
          label={t('form:label.type')}
          items={typeFieldOptions}
          fieldProps={{ defaultValue: typeFieldDefault }}
        />

        <EmailField name={registeredFormFields.sender} label={t('form:label.sender')} />

        <InputField name={registeredFormFields.subject} label={t('form:label.subject')} />
        <TextareaField name={registeredFormFields.content} label={t('form:label.content')} />
      </FormLayout>
    </ControlledForm>
  );
};

export default MessagesDetailForm;
