import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Divider } from '@mui/material';
import { FileUploaderQueue } from '../../../types';
import { ControlledForm, DebugFormModel, Content, SubmitButton, ActionBar } from '../../../components';
import { useAttachmentsCreateForm } from './useAttachmentsCreateForm';
import AttachmentsQueue from './AttachmentsQueue';

const AttachmentsCreateForm = () => {
  const [dragOver, setDragOver] = useState(false);

  const { t } = useTranslation();
  const { form, onSubmit, queueFieldArray, inputElement, onInputChange } = useAttachmentsCreateForm();

  const queueFields = queueFieldArray.fields as FileUploaderQueue;

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <Content>
        <Box
          sx={({ palette, shape }) => ({
            width: '100%',
            height: queueFields.length > 0 ? '25vh' : '50vh',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `5px ${dragOver ? 'solid' : 'dashed'} ${palette.divider}`,
            borderRadius: shape.borderRadius,
          })}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            onInputChange(event.dataTransfer.files);
            setDragOver(false);
          }}
          onDragEnter={() => {
            setDragOver(true);
          }}
          onDragLeave={() => {
            setDragOver(false);
          }}
        >
          <Button variant="contained" color="secondary" component="label">
            {t('button.selectOrDropFiles')}
            <input type="file" multiple onChange={(e) => onInputChange(e.target.files)} ref={inputElement} hidden />
          </Button>
        </Box>
        <AttachmentsQueue queue={queueFields} onRemove={queueFieldArray.remove} />
        <Divider />
        <ActionBar>
          <SubmitButton disabled={queueFields.length < 1}>{t('button.uploadQueue')}</SubmitButton>
          <Button type="reset" variant="outlined">
            {t('button.clearQueue')}
          </Button>
        </ActionBar>

        <DebugFormModel name="AttachmentsCreateForm" />
      </Content>
    </ControlledForm>
  );
};

export default AttachmentsCreateForm;
