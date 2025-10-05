import { useWatch } from 'react-hook-form';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { articlesTypeDefault, modelKeys } from '@common';
import { registeredFormFields } from '../../../enums';
import { getTypedDate, getConfig } from '../../../utils';
import {
  ControlledForm,
  FormDetailSidebar,
  FormDetailActions,
  DateTimePickerField,
  FormLayout,
  HiddenCard,
  InputField,
  LocalesTabs,
  SelectField,
  TextareaField,
  WysiwygField,
  AddressField,
  DebugFormModel,
  GpsPickerField,
} from '../../../components';
import { TagsPickerField } from '../../Tags';
import { CategoriesPickerField } from '../../Categories';
import { AttachmentsPickerField } from '../../Attachments';
import { CommentsManager } from '../../Comments';
import { useArticlesDetailForm } from './useArticlesDetailForm';

const ArticlesDetailForm = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['common', 'form']);
  const { detailId, form, locale, locales, onSubmit, onLocaleChange, fieldOptions } = useArticlesDetailForm();

  const isComments = true; // TODO

  const type = useWatch({ name: registeredFormFields.type, control: form.control });
  const startDate = useWatch({ name: registeredFormFields.startDate, control: form.control });
  const created = useWatch({ name: registeredFormFields.created, control: form.control });
  const updated = useWatch({ name: registeredFormFields.updated, control: form.control });

  return (
    <ControlledForm key={detailId} form={form} formProps={{ onSubmit }}>
      <FormLayout
        actions={<FormDetailActions detailId={detailId} listPath={`/${routes.articles.path}`} />}
        sidebar={<FormDetailSidebar detailId={detailId} created={created} updated={updated} />}
        actionbar={<CommentsManager isEnabled={isComments} contentType={modelKeys.articles} contentId={detailId} />}
      >
        <InputField name={registeredFormFields.name} label={t('form:label.name')} />
        <SelectField
          name={registeredFormFields.type}
          label={t('form:label.type')}
          items={fieldOptions.type}
          fieldProps={{ defaultValue: articlesTypeDefault, sx: { width: { xs: '100%', md: '33%' } } }}
        />
        <HiddenCard visible={type === 'event'}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DateTimePickerField name={registeredFormFields.startDate} label={t('form:label.startDate')} isRequired />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DateTimePickerField
                name={registeredFormFields.endDate}
                label={t('form:label.endDate')}
                fieldProps={{ minDate: getTypedDate(startDate) }}
                isRequired
              />
            </Grid>
          </Grid>
          <AddressField fieldPrefix="eventAddress" disableCard />
          <GpsPickerField name={registeredFormFields.gpsLocation} label={t('form:label.gpsLocation')} />
        </HiddenCard>
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
        <CategoriesPickerField
          name={registeredFormFields.categories}
          label={t('form:label.categories')}
          multiple
          defaultValue={[]}
        />
        <TagsPickerField name={registeredFormFields.tags} label={t('form:label.tags')} multiple defaultValue={[]} />
        <AttachmentsPickerField
          name={registeredFormFields.attachments}
          label={t('form:label.attachments')}
          multiple
          defaultValue={[]}
        />

        <DebugFormModel name="ArticlesDetailForm" />
      </FormLayout>
    </ControlledForm>
  );
};

export default ArticlesDetailForm;
