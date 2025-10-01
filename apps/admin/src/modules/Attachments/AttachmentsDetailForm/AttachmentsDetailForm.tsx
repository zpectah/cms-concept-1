import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import { AttachmentsType } from '@common';
import { registeredFormFields } from '../../../enums';
import { getConfig } from '../../../utils';
import { getOptionValue, useAttachmentTypeElement } from '../../../helpers';
import { ControlledForm, FormDetailSidebar, FormDetailActions, FormLayout, Literal } from '../../../components';
import { useAttachmentsDetailForm } from './useAttachmentsDetailForm';

const AttachmentsDetailForm = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['common', 'form']);
  const { detailId, form, onSubmit } = useAttachmentsDetailForm();
  const { getElementByType } = useAttachmentTypeElement();

  const sourcePrefix = 'http://localhost:8080/'; // TODO

  const created = useWatch({ name: registeredFormFields.created, control: form.control });
  const updated = useWatch({ name: registeredFormFields.updated, control: form.control });
  const name = useWatch({ name: registeredFormFields.name, control: form.control });
  const type = useWatch({ name: registeredFormFields.type, control: form.control });

  const fileName = useWatch({ name: 'file_name', control: form.control });
  const fileSize = useWatch({ name: 'file_size', control: form.control });
  const fileType = useWatch({ name: 'file_type', control: form.control });

  return (
    <ControlledForm
      key={detailId}
      form={form}
      formProps={{
        onSubmit,
      }}
    >
      <FormLayout
        actions={<FormDetailActions detailId={detailId} listPath={`/${routes.tags.path}`} />}
        sidebar={
          <FormDetailSidebar
            detailId={detailId}
            created={created}
            updated={updated}
            cardContent={
              <>
                <Literal label="File size" value={fileSize} />
                <Literal label="File mime" value={fileType} />
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
