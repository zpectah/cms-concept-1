import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Stack, Paper, Typography } from '@mui/material';
import { newItemKey, Model } from '@common';
import {
  DialogBase,
  ControlledForm,
  FormContent,
  InputField,
  TextareaField,
  SubmitButton,
  Literal,
} from '../../../../components';
import { registeredFormFields } from '../../../../enums';
import { getFormattedDateString } from '../../../../utils';
import { useCommentsManagerContext } from '../CommentsManager.context';
import { useCommentsDetailForm } from './useCommentsDetailForm';

interface CommentsDetailFormProps {
  open: boolean;
  onClose: () => void;
  contentType: Model;
  contentId: number;
}

const CommentsDetailForm = ({ open, onClose, contentType, contentId }: CommentsDetailFormProps) => {
  const { t } = useTranslation(['common', 'modules', 'form']);
  const { detailId, replyTo } = useCommentsManagerContext();
  const { form, onSubmit, repliedDetailData } = useCommentsDetailForm({
    id: detailId === null ? 0 : detailId,
    parent: replyTo === null ? 0 : replyTo,
    contentType,
    contentId,
  });

  const name = form.watch(registeredFormFields.name);
  const sender = form.watch(registeredFormFields.sender);
  const subject = form.watch(registeredFormFields.subject);

  const dialogTitle = detailId === newItemKey ? t('modules:comments.newDetailTitle') : name;

  useEffect(() => {
    if (repliedDetailData && subject === '') {
      form.setValue(registeredFormFields.subject, `Re: ${repliedDetailData?.subject}`);
    }
  }, [subject, repliedDetailData]);

  return (
    <DialogBase
      open={open}
      onClose={onClose}
      dialogProps={{
        maxWidth: 'md',
        fullWidth: true,
      }}
      title={dialogTitle}
      actions={
        <>
          <SubmitButton form="CommentsDetailForm">
            {detailId === newItemKey ? t('button.create') : t('button.update')}
          </SubmitButton>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            {t('button.cancel')}
          </Button>
        </>
      }
      content={
        <>
          {repliedDetailData && (
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Stack direction="column" gap={1}>
                <Typography variant="h4">{repliedDetailData.subject}</Typography>
                <Typography variant="caption">
                  {repliedDetailData.sender} | {getFormattedDateString(repliedDetailData.created)}
                </Typography>
                <Typography variant="body1">{repliedDetailData.content}</Typography>
              </Stack>
            </Paper>
          )}
          <ControlledForm form={form} formProps={{ onSubmit, id: 'CommentsDetailForm' }}>
            <FormContent>
              <Literal label={t('form:label.sender')} value={sender} hidden={detailId === newItemKey} />
              <InputField name={registeredFormFields.subject} label={t('form:label.subject')} />
              <TextareaField name={registeredFormFields.content} label={t('form:label.content')} />
            </FormContent>
          </ControlledForm>
        </>
      }
    />
  );
};

export default CommentsDetailForm;
