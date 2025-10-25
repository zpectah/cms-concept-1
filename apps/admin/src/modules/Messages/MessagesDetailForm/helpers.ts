import { messagesTypeDefault, getRandomString, MessagesDetail } from '@common';
import { IMessagesDetailForm } from './types';

export const getMessagesDetailFormDefaultValues = (): IMessagesDetailForm => {
  return {
    id: 0,
    name: getRandomString(),
    sender: '',
    subject: '',
    content: '',
    type: messagesTypeDefault,
    active: true,
    deleted: false,
  };
};

export const getMessagesDetailFormMapper = (data: MessagesDetail): IMessagesDetailForm => {
  return {
    ...data,

    content: data.content ?? '',
  };
};

export const getMessagesDetailFormMapperToMaster = (data: IMessagesDetailForm) => {
  return Object.assign({
    ...data,
  });
};
