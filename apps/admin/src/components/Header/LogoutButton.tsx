import { useTranslation } from 'react-i18next';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButtonPlus } from '../Button';
import { useUserLogout } from '../../hooks';

const LogoutButton = () => {
  const { t } = useTranslation(['common']);
  const { onLogout } = useUserLogout();

  return (
    <IconButtonPlus onClick={onLogout} color="inherit" tooltip={t('button.logOut')}>
      <LogoutIcon color="inherit" />
    </IconButtonPlus>
  );
};

export default LogoutButton;
