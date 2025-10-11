import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { DialogBase } from '../../../components';
import { BlacklistItemForm } from './BlacklistItemForm';

const BlacklistNewItemDialog = () => {
  const { t } = useTranslation(['common']);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const openHandler = () => setDialogOpen(true);

  const closeHandler = () => setDialogOpen(false);

  return (
    <>
      <Button
        id="blacklist-new-item-button"
        aria-haspopup="true"
        aria-expanded={dialogOpen ? 'true' : undefined}
        variant="outlined"
        size="small"
        onClick={openHandler}
      >
        {t('button.newRecord')}
      </Button>
      <DialogBase
        open={dialogOpen}
        onClose={closeHandler}
        title={t('label.newRecord')}
        content={<BlacklistItemForm afterSubmit={closeHandler} />}
        dialogProps={{ maxWidth: 'md', fullWidth: true }}
        contentProps={{ dividers: true }}
      />
    </>
  );
};

export default BlacklistNewItemDialog;
