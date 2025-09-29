import { Box, Grid, Button } from '@mui/material';
import { ItemBase } from '@common';
import { Card } from '../../Card';
import { TilesViewProps } from '../types';

const TilesView = <T extends ItemBase>({
  name,
  rows = [],
  pathPrefix,
  selected = [],
  onSelect,
  onDetail,
  onDelete,
  onDisable,
  isLoading,
  disableFavorites,
  renderRowActions,
}: TilesViewProps<T>) => {
  return (
    <Box>
      <Grid container rowSpacing={2} columnSpacing={2}>
        {rows.map((row) => {
          return (
            <Grid key={row.id} size={6}>
              <Card
                title={row.name}
                cardHeaderProps={{
                  title: row.name,
                }}
                cardActions={
                  <>
                    <Button onClick={() => onDelete(row.id)}>delete</Button>
                    <Button onClick={() => onDisable(row.id)}>disable</Button>
                    <Button onClick={() => onDetail(row.id)}>detail</Button>
                  </>
                }
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default TilesView;
