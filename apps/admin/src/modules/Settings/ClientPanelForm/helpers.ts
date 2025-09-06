import { META_ROBOTS_OPTIONS_DEFAULT } from '../../../constants';
import { ISettingsClientPanelForm } from './types';

export const getDataToFormMapper = (): ISettingsClientPanelForm => {
  return {
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
    metaRobots: META_ROBOTS_OPTIONS_DEFAULT,
    stateDebug: false,
    stateMaintenance: false,
    messagesActive: true,
    messagesRecipients: [],
    commentsActive: true,
    commentsAnonymous: true,
    membersActive: true,
  };
};
