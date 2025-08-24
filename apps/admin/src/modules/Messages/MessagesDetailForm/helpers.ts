import { getConfig } from '../../../utils';
import { IMessagesDetailForm } from './types';

export const getMessagesTypeDefaultValue = () => {
  const { model } = getConfig();

  return model.messages.default;
};

export const getMessagesDetailFormDefaultValues = (): IMessagesDetailForm => {
  return {
    id: 0,
    name: '',
    sender: '',
    subject: '',
    content: '',
    type: getMessagesTypeDefaultValue(),
    active: true,
    deleted: false,
  };
};
