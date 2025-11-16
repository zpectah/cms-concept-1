import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAppStore } from '../../store';
import { IconButtonPlus } from '../Button';
import { useUserActions } from '../../hooks';

const UserMenu = () => {
  const { profile } = useUserActions();
  const { profileDialogOpen, toggleProfileDialog } = useAppStore();

  if (!profile.view) return;

  return (
    <IconButtonPlus
      tooltip="User menu"
      color="inherit"
      onClick={toggleProfileDialog}
      aria-controls={profileDialogOpen ? 'user-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={profileDialogOpen ? 'true' : undefined}
      sx={(theme) => ({
        textShadow: `1px 1px 0 ${theme.palette.text.disabled}`,
      })}
    >
      <AccountCircleIcon color="inherit" />
    </IconButtonPlus>
  );
};

export default UserMenu;
