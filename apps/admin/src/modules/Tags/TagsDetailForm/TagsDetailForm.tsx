import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { tagsColorDefault, tagsTypeDefault } from '@common';
import { registeredFormFields } from '../../../enums';
import { getConfig } from '../../../config';
import {
  ControlledForm,
  FormDetailSidebar,
  FormDetailActions,
  FormLayout,
  InputField,
  SelectField,
  DebugFormModel,
} from '../../../components';
import { useUserActions } from '../../../hooks';
import { useTagsDetailForm } from './useTagsDetailForm';

const TagsDetailForm = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['common', 'form']);
  const { tags: modelActions } = useUserActions();
  const { detailId, form, onSubmit, fieldOptions } = useTagsDetailForm();

  const created = useWatch({ name: registeredFormFields.created, control: form.control });
  const updated = useWatch({ name: registeredFormFields.updated, control: form.control });

  return (
    <ControlledForm key={detailId} form={form} formProps={{ onSubmit }}>
      <FormLayout
        actions={
          <FormDetailActions detailId={detailId} listPath={`/${routes.tags.path}`} modelActions={modelActions} />
        }
        sidebar={<FormDetailSidebar detailId={detailId} created={created} updated={updated} />}
      >
        <InputField name={registeredFormFields.name} label={t('form:label.name')} isRequired />
        <SelectField
          name={registeredFormFields.type}
          label={t('form:label.type')}
          items={fieldOptions.type}
          fieldProps={{ defaultValue: tagsTypeDefault, sx: { width: { xs: '100%', md: '33%' } } }}
        />
        <SelectField
          name={registeredFormFields.color}
          label={t('form:label.color')}
          items={fieldOptions.color}
          fieldProps={{ defaultValue: tagsColorDefault, sx: { width: { xs: '100%', md: '33%' } } }}
        />

        <DebugFormModel name="TagsDetailForm" />
      </FormLayout>
    </ControlledForm>
  );
};

export default TagsDetailForm;
