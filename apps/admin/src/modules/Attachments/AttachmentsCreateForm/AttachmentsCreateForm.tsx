import { FileUploader } from '../../FileUploader';
import { ControlledForm } from '../../../components';
import { useAttachmentsCreateForm } from './useAttachmentsCreateForm';

const AttachmentsCreateForm = () => {
  const { form } = useAttachmentsCreateForm();

  return (
    <ControlledForm
      form={form}
      formProps={{
        onSubmit: (data) => {
          console.log('on submit', data);
        },
      }}
    >
      ...AttachmentsCreateForm...
      <FileUploader
        renderQueue={(queue) => {
          return (
            <ul>
              {queue.map((file, index) => {
                return <li key={index}>{file.name}</li>;
              })}
            </ul>
          );
        }}
      />
    </ControlledForm>
  );
};

export default AttachmentsCreateForm;
