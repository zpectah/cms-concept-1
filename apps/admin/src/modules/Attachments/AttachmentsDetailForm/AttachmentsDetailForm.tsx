import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import { formatBytes, AttachmentsType } from '@common';
import { registeredFormFields } from '../../../enums';
import { getConfig } from '../../../utils';
import { getEnvironmentVariables, getOptionValue, useAttachmentTypeElement } from '../../../helpers';
import { ControlledForm, FormDetailSidebar, FormDetailActions, FormLayout, Literal } from '../../../components';
import { useUserActions } from '../../../hooks';
import { useAttachmentsDetailForm } from './useAttachmentsDetailForm';

const AttachmentsDetailForm = () => {
  const {
    admin: { routes },
  } = getConfig();

  const { t } = useTranslation(['common', 'form']);
  const { attachments: modelActions } = useUserActions();
  const { detailId, form, onSubmit } = useAttachmentsDetailForm();
  const { getElementByType } = useAttachmentTypeElement();
  const { uploadsSource } = getEnvironmentVariables();

  const created = useWatch({ name: registeredFormFields.created, control: form.control });
  const updated = useWatch({ name: registeredFormFields.updated, control: form.control });
  const name = useWatch({ name: registeredFormFields.name, control: form.control });
  const type = useWatch({ name: registeredFormFields.type, control: form.control });
  const fileName = useWatch({ name: registeredFormFields.file_name, control: form.control });
  const fileSize = useWatch({ name: registeredFormFields.file_size, control: form.control });
  const fileType = useWatch({ name: registeredFormFields.file_type, control: form.control });

  const sourcePrefix = `${uploadsSource}${type}/`; // TODO

  return (
    <ControlledForm key={detailId} form={form} formProps={{ onSubmit }}>
      <FormLayout
        actions={
          <FormDetailActions detailId={detailId} listPath={`/${routes.tags.path}`} modelActions={modelActions} />
        }
        sidebar={
          <FormDetailSidebar
            detailId={detailId}
            created={created}
            updated={updated}
            cardContent={
              <>
                <Literal label={t('form:label.fileSize')} value={formatBytes(fileSize ?? 0)} />
                <Literal label={t('form:label.fileMime')} value={fileType} />
              </>
            }
          />
        }
      >
        <Literal label={t('form:label.name')} value={fileName} />
        <Literal label={t('form:label.type')} value={getOptionValue(type, 'model')} />
        <Stack alignItems="center" justifyContent="center" sx={{}}>
          {getElementByType(type as AttachmentsType, {
            source: `${sourcePrefix}${fileName}`,
            alt: name,
            imgStyle: { maxWidth: '100%', height: 'auto' },
            iconProps: { sx: { fontSize: '350%' } },
          })}
        </Stack>
      </FormLayout>
    </ControlledForm>
  );
};

export default AttachmentsDetailForm;
