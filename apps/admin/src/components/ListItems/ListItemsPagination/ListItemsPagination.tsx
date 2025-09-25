import { Stack, Box, IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Card } from '../../Card';
import { ListItemsPaginationProps } from '../types';

const ListItemsPagination = ({
  pages,
  page,
  onPageFirst,
  onPageLast,
  onPageNext,
  onPagePrev,
  disabledButton,
}: ListItemsPaginationProps) => (
  <Card>
    <Stack direction="row" alignItems="center" justifyContent="center" gap={2}>
      <IconButton onClick={onPageFirst} disabled={disabledButton.first}>
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={onPagePrev} disabled={disabledButton.prev}>
        <KeyboardArrowLeftIcon />
      </IconButton>
      <Box sx={{ width: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {page} / {pages}
      </Box>
      <IconButton onClick={onPageNext} disabled={disabledButton.next}>
        <KeyboardArrowRightIcon />
      </IconButton>
      <IconButton onClick={onPageLast} disabled={disabledButton.last}>
        <LastPageIcon />
      </IconButton>
    </Stack>
  </Card>
);

export default ListItemsPagination;
