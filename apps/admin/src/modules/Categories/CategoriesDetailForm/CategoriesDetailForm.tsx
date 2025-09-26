import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { categoriesTypeDefault, newItemKey } from '@common';
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
  TextareaField,
} from '../../../components';
import { CategoriesPickerField } from '../../Categories';
import { useCategoriesDetailForm } from './useCategoriesDetailForm';

const CategoriesDetailForm = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['common', 'form']);
  const { detailId, form, locale, locales, onSubmit, onLocaleChange, fieldOptions } = useCategoriesDetailForm();

  const created = useWatch({ name: registeredFormFields.created, control: form.control });
  const updated = useWatch({ name: registeredFormFields.updated, control: form.control });

  return (
    <ControlledForm key={detailId} form={form} formProps={{ onSubmit }}>
      <FormLayout
        actions={<FormDetailActions detailId={detailId} listPath={`/${routes.articles.path}`} />}
        sidebar={<FormDetailSidebar detailId={detailId} created={created} updated={updated} />}
      >
        <InputField name={registeredFormFields.name} label={t('form:label.name')} />
        <SelectField
          name={registeredFormFields.type}
          label={t('form:label.type')}
          items={fieldOptions.type}
          fieldProps={{ defaultValue: categoriesTypeDefault, sx: { width: { xs: '100%', md: '33%' } } }}
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
            </>
          )}
        />

        <CategoriesPickerField
          name={registeredFormFields.parent}
          label={t('form:label.parent')}
          ignored={detailId !== newItemKey ? [Number(detailId)] : []}
        />
      </FormLayout>
    </ControlledForm>
  );
};

export default CategoriesDetailForm;
