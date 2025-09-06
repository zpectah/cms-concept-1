import { Stack } from '@mui/material';
import { useAppStore } from '../../../store';
import AnnouncementsListItem from './AnnouncementsListItem';

const AnnouncementsList = () => {
  const { announcements, removeAnnouncement } = useAppStore();

  return (
    <Stack direction="column" gap={0}>
      {announcements.map((announcement) => (
        <AnnouncementsListItem key={announcement.id} onClose={removeAnnouncement} {...announcement} />
      ))}
    </Stack>
  );
};

export default AnnouncementsList;
