import { Box, Grid } from '@mui/material';
import { ItemBase } from '@common';
import { AttachmentsViewProps } from '../types';
import AttachmentsViewItem from './AttachmentsViewItem';

const AttachmentsView = <T extends ItemBase>({
  name,
  pathPrefix,
  rows = [],
  selected = [],
  onSelect,
  onDetail,
  onDelete,
  onDisable,
  isLoading,
  disableFavorites,
  renderRowActions,
}: AttachmentsViewProps<T>) => {
  return (
    <Box>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        {rows.map((row) => {
          const isSelected = selected.indexOf(row.id) > -1;

          return (
            <Grid key={row.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <AttachmentsViewItem<T>
                item={row}
                onSelect={onSelect}
                onDetail={onDetail}
                onDelete={onDelete}
                onDisable={onDisable}
                renderRowActions={renderRowActions}
                isSelected={isSelected}
                isLoading={isLoading ?? false}
                disableFavorites={disableFavorites ?? false}
                pathPrefix={pathPrefix}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AttachmentsView;
