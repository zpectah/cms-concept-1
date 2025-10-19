import { Stack, Button } from '@mui/material';
import { useAppStore } from '../../../store';
import { Drawer } from '../../../components';
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
      <Stack direction="column" gap={2}>
        <Stack direction="row">
          <Button variant="outlined" color="secondary">
            Log out
          </Button>
        </Stack>
        <AccountForm />
      </Stack>
    </Drawer>
  );
};

export default AccountFormDialog;
