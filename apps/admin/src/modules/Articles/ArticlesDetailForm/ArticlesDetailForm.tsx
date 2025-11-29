import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { articlesTypeDefault, modelKeys, newItemKey } from '@common';
import { registeredFormFields } from '../../../enums';
import { getConfig } from '../../../config';
import { getTypedDate } from '../../../utils';
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
  GpsPickerField,
  FormContent,
  SwitchField,
  DynamicPortal,
} from '../../../components';
import { useUserActions } from '../../../hooks';
import { TagsPickerField } from '../../Tags';
import { CategoriesPickerField } from '../../Categories';
import { AttachmentsPickerField } from '../../Attachments';
import { CommentsManager } from '../../Comments';
import { useArticlesDetailForm } from './useArticlesDetailForm';

const ArticlesDetailForm = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['common', 'form']);
  const { articles: modelActions } = useUserActions();
  const { detailId, form, locale, locales, onSubmit, onLocaleChange, fieldOptions, detailData } =
    useArticlesDetailForm();

  const dynamicSlotId = `portal-transport-articles-${detailId}-comments`;

  const type = useWatch({ name: registeredFormFields.type, control: form.control });
  const startDate = useWatch({ name: registeredFormFields.event_start, control: form.control });
  const created = useWatch({ name: registeredFormFields.created, control: form.control });
  const updated = useWatch({ name: registeredFormFields.updated, control: form.control });

  const isComments = detailId !== newItemKey;

  return (
    <>
      <ControlledForm key={detailId} form={form} formProps={{ onSubmit }}>
        <FormLayout
          actions={
            <FormDetailActions detailId={detailId} listPath={`/${routes.articles.path}`} modelActions={modelActions} />
          }
          sidebar={
            <FormDetailSidebar detailId={detailId} created={created} updated={updated}>
              <SwitchField
                name={registeredFormFields.approved}
                fieldProps={{ label: t('form:label.approved') }}
                isDisabled={detailData?.approved || !modelActions.approve}
              />
            </FormDetailSidebar>
          }
          actionbar={<div id={dynamicSlotId} style={{ marginTop: '1rem' }} />}
        >
          <InputField name={registeredFormFields.name} label={t('form:label.name')} isRequired />
          <SelectField
            name={registeredFormFields.type}
            label={t('form:label.type')}
            items={fieldOptions.type}
            fieldProps={{ defaultValue: articlesTypeDefault, sx: { width: { xs: '100%', md: '33%' } } }}
          />
          <HiddenCard visible={type === 'event'} sx={{ marginTop: 1.5 }}>
            <FormContent>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DateTimePickerField
                    name={registeredFormFields.event_start}
                    label={t('form:label.eventStart')}
                    isRequired
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DateTimePickerField
                    name={registeredFormFields.event_end}
                    label={t('form:label.eventEnd')}
                    fieldProps={{ minDate: getTypedDate(startDate) }}
                    isRequired
                  />
                </Grid>
              </Grid>
              <AddressField fieldPrefix={registeredFormFields.event_address} disableCard />
              <GpsPickerField name={registeredFormFields.event_location} label={t('form:label.eventLocation')} />
            </FormContent>
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
        </FormLayout>
      </ControlledForm>

      {/* We must render out of the main form due to context conflict */}
      <DynamicPortal targetId={dynamicSlotId}>
        <CommentsManager
          isEnabled={isComments}
          contentType={modelKeys.articles}
          contentId={detailId !== newItemKey ? Number(detailId) : 0}
        />
      </DynamicPortal>
    </>
  );
};

export default ArticlesDetailForm;
