import { useTranslation } from 'react-i18next';
import { getConfig } from '../utils';
import { useUserQuery } from '../hooks-query';
import { useAppStore } from '../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../constants';

export const useUserLogout = () => {
  const {
    admin: { routes },
  } = getConfig();

  const { t } = useTranslation(['common', 'modules']);
  const { addToast, openConfirmDialog } = useAppStore();
  const { userLogoutMutation } = useUserQuery();

  const { mutate } = userLogoutMutation;

  const logoutConfirmHandler = () => {
    mutate(
      {
        /* No variables for logout */
      },
      {
        onSuccess: (res) => {
          if (!res.open) {
            addToast(t('message.success.logoutSuccess'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
            document.location = `/${routes.login.path}?reason=user`;
          } else {
            addToast(t('message.error.logoutError'), 'error');
          }
        },
        onError: (err) => {
          addToast(t('message.error.common'), 'error');
          console.warn(err);
        },
      }
    );
  };

  const logoutHandler = () => {
    openConfirmDialog({
      title: t('message.confirm.logOut.title'),
      content: t('message.confirm.logOut.content'),
      onConfirm: logoutConfirmHandler,
    });
  };

  return {
    onLogout: logoutHandler,
  };
};
