import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button, Stack, Grid } from '@mui/material';
import { getOptionValue, useAttachmentTypeElement } from '../../../helpers';
import { Card, InputField, Literal, FormContent, ImageCropper } from '../../../components';
import { IAttachmentsCreateForm } from './types';
import { AttachmentsType } from '@common';

const AttachmentsQueue = () => {
  const [cropSource, setCropSource] = useState<{ source: string; index: number } | null>(null);

  const { t } = useTranslation(['common', 'form']);
  const { control, watch } = useFormContext<IAttachmentsCreateForm>();
  const { remove, update } = useFieldArray({
    control,
    name: 'queue',
  });
  const { getElementByType, isTypeImage } = useAttachmentTypeElement();

  const queue = watch('queue');

  const openCropperHandler = (source: string, index: number) => {
    setCropSource({ source, index });
  };

  const closeCropperHandler = () => {
    setCropSource(null);
  };

  const saveHandler = (source: string, index: number) => {
    update(index, {
      ...queue[index],
      content: source,
    });
  };

  return (
    <>
      {queue.map((file, index) => (
        <Card key={index}>
          <FormContent>
            <Stack alignItems="center" justifyContent="center" sx={{ p: 2 }}>
              {getElementByType(file.type as AttachmentsType, {
                source: file.content,
                alt: file.name,
                imgStyle: { maxWidth: '100%', height: 'auto' },
                iconProps: { sx: { fontSize: '350%' } },
              })}
            </Stack>
            <Grid container spacing={1}>
              <Grid size={{ xs: 12, md: 12 }}>
                <InputField
                  name={`queue[${index}].name`}
                  label={t('form:label.fileName')}
                  fieldProps={{
                    endAdornment: <span>.{file.extension}</span>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Literal label={t('form:label.fileType')} value={getOptionValue(file.type, 'model')} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Literal label={t('form:label.fileMime')} value={file.mime} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Literal label={t('form:label.fileSize')} value={`${file.size} b`} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Literal label="UID" value={file.uid} />
              </Grid>
            </Grid>
            <Stack direction="row" sx={{ mt: { xs: 2 } }} gap={2}>
              <Button onClick={() => remove(index)} variant="outlined" color="warning">
                {t('button.removeFromQueue')}
              </Button>
              {isTypeImage(file.type as AttachmentsType) && (
                <Button onClick={() => openCropperHandler(file.content, index)} variant="outlined">
                  {t('button.cropImage')}
                </Button>
              )}
            </Stack>
          </FormContent>
        </Card>
      ))}
      <ImageCropper open={!!cropSource} onClose={closeCropperHandler} cropSource={cropSource} onSave={saveHandler} />
    </>
  );
};

export default AttachmentsQueue;
