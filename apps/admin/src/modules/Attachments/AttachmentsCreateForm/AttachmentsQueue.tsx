import { Card, InputField } from '../../../components';
import { AttachmentsQueueProps } from './types';

const AttachmentsQueue = ({ queue }: AttachmentsQueueProps) => {
  return (
    <div>
      {queue.map((file, index) => {
        return (
          <div key={index}>
            <Card>
              <div>
                {['jpg', 'jpeg', 'png'].indexOf(file.extension) > -1 ? (
                  <img src={file.content} alt={file.name} style={{ maxWidth: '100%', height: 'auto' }} />
                ) : (
                  <span>{file.filename}</span>
                )}
              </div>
              <InputField
                name={`queue[${index}].name`}
                fieldProps={{
                  endAdornment: <span>.{file.extension}</span>,
                }}
              />
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default AttachmentsQueue;
