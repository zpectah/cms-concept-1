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
  TextareaField,
} from '../../../components';
import { CategoriesPickerField } from '../../Categories';
import { useCategoriesDetailForm } from './useCategoriesDetailForm';
import { newItemKey } from '@common';

const CategoriesDetailForm = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['common', 'form']);
  const { detailId, form, locale, locales, onSubmit, onLocaleChange, typeFieldDefault, typeFieldOptions } =
    useCategoriesDetailForm();

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
          items={typeFieldOptions}
          fieldProps={{ defaultValue: typeFieldDefault }}
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
