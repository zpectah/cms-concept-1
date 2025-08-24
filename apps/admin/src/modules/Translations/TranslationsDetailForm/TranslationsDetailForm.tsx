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
  LocalesTabs,
  SelectField,
} from '../../../components';
import { useTranslationsDetailForm } from './useTranslationsDetailForm';

const TranslationsDetailForm = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['common', 'form']);
  const { detailId, form, locale, locales, onSubmit, onLocaleChange, typeFieldDefault, typeFieldOptions } =
    useTranslationsDetailForm();

  const created = useWatch({ name: registeredFormFields.created, control: form.control });
  const updated = useWatch({ name: registeredFormFields.updated, control: form.control });

  return (
    <ControlledForm key={detailId} form={form} formProps={{ onSubmit }}>
      <FormLayout
        actions={<FormDetailActions detailId={detailId} listPath={`/${routes.translations.path}`} />}
        sidebar={<FormDetailSidebar detailId={detailId} created={created} updated={updated} />}
      >
        <InputField name={registeredFormFields.name} label={t('form:label.name')} />
        <SelectField
          name={registeredFormFields.type}
          label={t('form:label.type')}
          items={typeFieldOptions}
          fieldProps={{ defaultValue: typeFieldDefault }}
        />
        <LocalesTabs
          locales={locales}
          locale={locale}
          onLocaleChange={onLocaleChange}
          render={(loc) => (
            <InputField
              name={`${registeredFormFields.locale}.${loc}.${registeredFormFields.value}`}
              label={t('form:label.value')}
              isRequired
            />
          )}
        />
      </FormLayout>
    </ControlledForm>
  );
};

export default TranslationsDetailForm;
