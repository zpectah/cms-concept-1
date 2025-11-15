import { SettingsClient } from '@common';
import { META_ROBOTS_OPTIONS_DEFAULT } from '../../../constants';
import { ISettingsClientPanelForm } from './types';

export const getDataToFormMapper = (data?: SettingsClient): ISettingsClientPanelForm => {
  return {
    meta: {
      title: data?.meta.title ?? '',
      description: data?.meta.description ?? '',
      keywords: data?.meta.keywords ?? [],
      robots: data?.meta.robots ?? META_ROBOTS_OPTIONS_DEFAULT,
    },
    state: {
      debug: data?.state.debug ?? false,
      maintenance: data?.state.maintenance ?? false,
    },
    messages: {
      active: data?.messages.active ?? true,
      recipients: data?.messages.recipients ?? [],
    },
    comments: {
      active: data?.comments.active ?? true,
      anonymous: data?.comments.anonymous ?? true,
    },
    members: {
      active: data?.members.active ?? true,
    },
    email: {
      smtp: {
        ...data?.email.smtp,
        port: data?.email.smtp.port ?? 587,
        host: data?.email.smtp.host ?? '',
        username: data?.email.smtp.username ?? '',
        password: '',
      },
    },
  };
};

export const getSettingsClientFormMapper = (data: ISettingsClientPanelForm) => {
  return Object.assign({
    ...data,
  });
};
