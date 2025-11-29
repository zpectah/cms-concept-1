import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { Model } from '@common';
import {
  DialogBase,
  ControlledForm,
  DebugFormModel,
  FormContent,
  InputField,
  EmailField,
  TextareaField,
  SubmitButton,
} from '../../../../components';
import { registeredFormFields } from '../../../../enums';
import { useCommentsManagerContext } from '../CommentsManager.context';
import { useCommentsDetailForm } from './useCommentsDetailForm';

interface CommentsDetailFormProps {
  open: boolean;
  onClose: () => void;
  contentType: Model;
  contentId: number;
}

const CommentsDetailForm = ({ open, onClose, contentType, contentId }: CommentsDetailFormProps) => {
  const { t } = useTranslation(['common']);
  const { detailId, replyTo } = useCommentsManagerContext();
  const { form, onSubmit } = useCommentsDetailForm({
    id: detailId === null ? 0 : detailId, // TODO
    parent: replyTo === null ? 0 : replyTo, // TODO
    contentType,
    contentId,
  });

  return (
    <DialogBase
      open={open}
      onClose={onClose}
      dialogProps={{
        maxWidth: 'md',
        fullWidth: true,
        keepMounted: true,
      }}
      title="New comment / Edit comment"
      actions={
        <>
          <SubmitButton form="CommentsDetailForm">Submit or create</SubmitButton>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>
        </>
      }
      content={
        <ControlledForm form={form} formProps={{ onSubmit, id: 'CommentsDetailForm' }}>
          <FormContent>
            <InputField name={registeredFormFields.name} label={t('form:label.name')} isRequired />
            <EmailField name="sender" label="Sender" />
            <InputField name="subject" label="Subject" />
            <TextareaField name="content" label="Content" />
          </FormContent>

          <DebugFormModel name="CommentsDetailForm" />
        </ControlledForm>
      }
    />
  );
};

export default CommentsDetailForm;
