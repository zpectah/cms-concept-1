import { Alert } from '@mui/material';
import { AnnouncementsItem } from '../../../types';

interface AnnouncementsListItemProps extends AnnouncementsItem {
  onClose: (id: string) => void;
}

const AnnouncementsListItem = ({ id, title, severity, onClose }: AnnouncementsListItemProps) => {
  return (
    <Alert
      id={id}
      severity={severity}
      onClose={() => onClose(id)}
      sx={{ borderRadius: 0, alignItems: 'center', justifyContent: 'center' }}
      slotProps={{ message: { sx: { alignItems: 'center' } }, action: { sx: { marginLeft: 0 } } }}
    >
      {title}
    </Alert>
  );
};

export default AnnouncementsListItem;
