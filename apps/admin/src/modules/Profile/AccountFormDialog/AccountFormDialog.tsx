import { useAppStore } from '../../../store';
import { Drawer, ThemeToggle, LocaleToggle } from '../../../components';
import { AccountForm } from '../AccountForm';

const AccountFormDialog = () => {
  const { profileDialogOpen, toggleProfileDialog } = useAppStore();

  return (
    <Drawer
      anchor="right"
      open={profileDialogOpen}
      onClose={toggleProfileDialog}
      slotProps={{
        paper: {
          sx: {
            width: {
              xs: '100%',
              md: '640px',
            },
          },
        },
      }}
      header="Profile"
    >
      {/* TODO */}
      <ThemeToggle />
      <LocaleToggle />

      <AccountForm />
    </Drawer>
  );
};

export default AccountFormDialog;
