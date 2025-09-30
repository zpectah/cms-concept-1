import { ControlledForm, FileUploader, DebugFormModel, Content } from '../../../components';
import { useAttachmentsCreateForm } from './useAttachmentsCreateForm';
import AttachmentsQueue from './AttachmentsQueue';

const AttachmentsCreateForm = () => {
  const { form, onSubmit, onQueueUpdate, queueFieldArray } = useAttachmentsCreateForm();

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <Content>
        <FileUploader onQueueUpdate={onQueueUpdate} />
        <AttachmentsQueue queue={queueFieldArray.fields} />
        <DebugFormModel name="AttachmentsCreateForm" />
      </Content>
    </ControlledForm>
  );
};

export default AttachmentsCreateForm;
