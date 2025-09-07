import { Stack } from '@mui/material';
import { Card } from '../../Card';
import { ListItemsPaginationProps } from '../types';
import { LIST_ITEMS_PER_PAGE_OPTIONS } from '../constants';

const ListItemsPagination = ({
  pages,
  page,
  onPageFirst,
  onPageLast,
  onPageNext,
  onPagePrev,
  onPerPageChange,
  onPageChange,
  perPage,
  disabledButton,
}: ListItemsPaginationProps) => {
  return (
    <Card>
      <Stack>
        <div>
          <button onClick={onPageFirst} disabled={disabledButton.first}>
            first
          </button>
          <button onClick={onPagePrev} disabled={disabledButton.prev}>
            prev
          </button>
          &nbsp;
          <button onClick={onPageNext} disabled={disabledButton.next}>
            next
          </button>
          <button onClick={onPageLast} disabled={disabledButton.last}>
            last
          </button>
        </div>
        <Stack>
          Page {page} of {pages}
        </Stack>
        <div>
          <select value={perPage} onChange={(event) => onPerPageChange(Number(event.target.value))}>
            {LIST_ITEMS_PER_PAGE_OPTIONS.map((item) => (
              <option key={item} value={item} label={String(item)} />
            ))}
          </select>
        </div>
      </Stack>
    </Card>
  );
};

export default ListItemsPagination;
