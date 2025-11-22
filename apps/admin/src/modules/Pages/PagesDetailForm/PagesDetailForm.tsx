import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { pagesTypeDefault } from '@common';
import { registeredFormFields } from '../../../enums';
import { getConfig } from '../../../config';
import {
  ControlledForm,
  FormDetailSidebar,
  FormDetailActions,
  FormLayout,
  InputField,
  LocalesTabs,
  SelectField,
  TextareaField,
  WysiwygField,
} from '../../../components';
import { useUserActions } from '../../../hooks';
import { usePagesDetailForm } from './usePagesDetailForm';

const PagesDetailForm = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['common', 'form']);
  const { pages: modelActions } = useUserActions();
  const { detailId, form, locale, locales, onSubmit, onLocaleChange, fieldOptions } = usePagesDetailForm();

  const created = useWatch({ name: registeredFormFields.created, control: form.control });
  const updated = useWatch({ name: registeredFormFields.updated, control: form.control });

  return (
    <ControlledForm key={detailId} form={form} formProps={{ onSubmit }}>
      <FormLayout
        actions={
          <FormDetailActions detailId={detailId} listPath={`/${routes.pages.path}`} modelActions={modelActions} />
        }
        sidebar={<FormDetailSidebar detailId={detailId} created={created} updated={updated} />}
      >
        <InputField name={registeredFormFields.name} label={t('form:label.name')} isRequired />
        <SelectField
          name={registeredFormFields.type}
          label={t('form:label.type')}
          items={fieldOptions.type}
          fieldProps={{ defaultValue: pagesTypeDefault, sx: { width: { xs: '100%', md: '33%' } } }}
        />
        <LocalesTabs
          locales={locales}
          locale={locale}
          onLocaleChange={onLocaleChange}
          render={(loc) => (
            <>
              <InputField
                name={`${registeredFormFields.locale}.${loc}.${registeredFormFields.title}`}
                label={t('form:label.title')}
                isRequired
              />
              <TextareaField
                name={`${registeredFormFields.locale}.${loc}.${registeredFormFields.description}`}
                label={t('form:label.description')}
              />
              <WysiwygField
                name={`${registeredFormFields.locale}.${loc}.${registeredFormFields.content}`}
                label={t('form:label.content')}
                isRequired
              />
            </>
          )}
        />
      </FormLayout>
    </ControlledForm>
  );
};

export default PagesDetailForm;
