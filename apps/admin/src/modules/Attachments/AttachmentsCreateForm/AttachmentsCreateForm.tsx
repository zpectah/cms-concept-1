import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Divider, Alert } from '@mui/material';
import { registeredFormFields } from '../../../enums';
import { ControlledForm, Content, SubmitButton, ActionBar } from '../../../components';
import { useAttachmentsCreateForm } from './useAttachmentsCreateForm';
import AttachmentsQueue from './AttachmentsQueue';

const AttachmentsCreateForm = () => {
  const [dragOver, setDragOver] = useState(false);

  const { t } = useTranslation(['common', 'form']);
  const { form, onSubmit, inputElement, onInputChange, onReset } = useAttachmentsCreateForm();

  const queue = form.watch(registeredFormFields.queue);

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <Content>
        <Box
          sx={({ palette, shape }) => ({
            width: '100%',
            height: queue.length > 0 ? '25vh' : '50vh',
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
        <AttachmentsQueue />
        {form.formState.errors.queue && <Alert severity="error">{t('message.error.formErrors')}</Alert>}
        <Divider />
        <ActionBar>
          <SubmitButton disabled={queue.length < 1}>{t('button.uploadQueue')}</SubmitButton>
          <Button variant="outlined" onClick={onReset}>
            {t('button.clearQueue')}
          </Button>
        </ActionBar>
      </Content>
    </ControlledForm>
  );
};

export default AttachmentsCreateForm;
