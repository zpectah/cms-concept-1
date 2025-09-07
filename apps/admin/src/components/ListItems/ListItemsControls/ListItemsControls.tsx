import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
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
      <div>
        categories: {JSON.stringify(selectedFilter.categories)}
        <br />
        {categories.map((item) => {
          return (
            <button key={item.id} onClick={() => onCategoryToggle(item.id)}>
              {item.name}
            </button>
          );
        })}
      </div>
    );
  };

  const renderTags = () => {
    if (!isTags) return;

    return (
      <div>
        tags: {JSON.stringify(selectedFilter.tags)}
        <br />
        {tags.map((item) => {
          return (
            <button key={item.id} onClick={() => onTagToggle(item.id)}>
              {item.name}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <Card>
      {!disableViewToggle && (
        <Stack>
          <div>
            <button onClick={onViewToggle}>toggle view: {view}</button>
          </div>
        </Stack>
      )}
      <Stack>
        <Search value={query} onChange={(event) => onQueryChange(event.target.value)} fullWidth />
      </Stack>
      <Stack>
        <ToggleButtonGroup value={sortBy} size="small">
          {orderKeys?.map((key, index) => (
            <ToggleButton key={index} value={key} onClick={() => onOrderBy(key)}>
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
      </Stack>
      <div>
        Selected {selected.length} of {rawRows.length} &nbsp;{' '}
        <button onClick={onDeselectedSelected} disabled={selected.length === 0}>
          deselect all
        </button>
        <button onClick={onDeleteSelected} disabled={selected.length === 0}>
          delete selected
        </button>
        <button onClick={onDisableSelected} disabled={selected.length === 0}>
          disable selected
        </button>
      </div>
      <Stack>
        {renderCategories()}
        {renderTags()}
      </Stack>
    </Card>
  );
};

export default ListItemsControls;
