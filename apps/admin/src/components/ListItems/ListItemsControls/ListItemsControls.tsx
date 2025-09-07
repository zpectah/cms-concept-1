import { Button, ButtonGroup, Stack, ToggleButton, ToggleButtonGroup, Grid } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ItemBase } from '@common';
import { Card } from '../../Card';
import { Search } from '../../input';
import { listItemsSortOrderKeys } from '../enums';
import { ListItemsControlsProps } from '../types';

const ListItemsControls = <T extends ItemBase>({
  disableViewToggle,
  view,
  onViewToggle,
  query,
  onQueryChange,
  orderBy,
  onOrderBy,
  sortBy,
  orderKeys,
  rawRows,
  selected,
  onDeselectedSelected,
  onDeleteSelected,
  onDisableSelected,
  isCategories,
  categories,
  onCategoryToggle,
  isTags,
  tags,
  onTagToggle,
  selectedFilter,
}: ListItemsControlsProps<T>) => {
  const renderCategories = () => {
    if (!isCategories) return;

    return (
      <Stack direction="row" gap={1}>
        {categories.map((item) => {
          const isSelected = selectedFilter.categories.includes(item.id);

          return (
            <Button
              key={item.id}
              onClick={() => onCategoryToggle(item.id)}
              size="small"
              variant={isSelected ? 'contained' : 'outlined'}
              color={isSelected ? 'primary' : 'inherit'}
            >
              {item.name}
            </Button>
          );
        })}
      </Stack>
    );
  };

  const renderTags = () => {
    if (!isTags) return;

    return (
      <Stack direction="row" gap={1}>
        {tags.map((item) => {
          const isSelected = selectedFilter.tags.includes(item.id);

          return (
            <Button
              key={item.id}
              onClick={() => onTagToggle(item.id)}
              size="small"
              variant={isSelected ? 'contained' : 'outlined'}
              color={isSelected ? 'primary' : 'inherit'}
            >
              {item.name}
            </Button>
          );
        })}
      </Stack>
    );
  };

  return (
    <>
      <Card>
        <Stack gap={1}>
          <Grid container>
            <Grid size={10}>
              <Search value={query} onChange={(event) => onQueryChange(event.target.value)} fullWidth />
            </Grid>
            <Grid size={2}>
              <Button variant="outlined" color="inherit">
                More...
              </Button>
            </Grid>
          </Grid>

          <Grid container>
            <Grid size={6}>
              <ToggleButtonGroup value={sortBy}>
                {orderKeys?.map((key, index) => (
                  <ToggleButton key={index} value={key} onClick={() => onOrderBy(key)} size="small">
                    &nbsp;{String(key)}&nbsp;
                    {key === sortBy && (
                      <>
                        {orderBy === listItemsSortOrderKeys.asc ? (
                          <ArrowUpwardIcon fontSize="inherit" />
                        ) : (
                          <ArrowDownwardIcon fontSize="inherit" />
                        )}
                      </>
                    )}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>
            <Grid size={6}>
              <Stack direction="row" gap={1}>
                <ButtonGroup variant="outlined" color="inherit" size="small">
                  <Button onClick={onDeselectedSelected} disabled={selected.length === 0}>
                    deselect all
                  </Button>
                  <Button onClick={onDeleteSelected} disabled={selected.length === 0}>
                    delete selected
                  </Button>
                  <Button onClick={onDisableSelected} disabled={selected.length === 0}>
                    disable selected
                  </Button>
                </ButtonGroup>
                <Button variant="outlined" color="inherit" size="small" onClick={onViewToggle}>
                  {view}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
        <Stack gap={1}>
          {renderCategories()}
          {renderTags()}
        </Stack>
      </Card>
    </>
  );
};

export default ListItemsControls;
