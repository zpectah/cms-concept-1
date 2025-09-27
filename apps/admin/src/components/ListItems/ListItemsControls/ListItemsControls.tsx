import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Stack, Grid, Collapse, ButtonProps } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ItemBase } from '@common';
import { getConfig } from '../../../utils';
import { muiCommonColorVariantKeys } from '../../../enums';
import { useSelectOptions } from '../../../helpers';
import { Card } from '../../Card';
import { Literal } from '../../Literal';
import { Search, Select } from '../../input';
import { listItemsSortOrderKeys } from '../enums';
import { ListItemsControlsProps } from '../types';
import { LIST_ITEMS_PER_PAGE_OPTIONS } from '../constants';

const ListItemsControls = <T extends ItemBase>({
  // model,
  // disableViewToggle,
  // filterDirty,
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
  types,
  isCategories,
  categories,
  onCategoryToggle,
  onTypeToggle,
  isTags,
  tags,
  onTagToggle,
  selectedFilter,
  onSelectAll,
  perPage,
  onPerPageChange,
  onFilterReset,
}: ListItemsControlsProps<T>) => {
  const [expanded, setExpanded] = useState(false);

  const { viewToggleEnabled } = getConfig();
  const { t } = useTranslation(['common', 'form', 'options']);
  const { getOptionsFromList } = useSelectOptions();

  const renderTypes = () => (
    <Literal
      label="Filter by type:"
      value={
        <Stack direction="row" gap={0.5}>
          {types.map((item) => {
            const isSelected = selectedFilter.types.includes(item);

            return (
              <Button
                key={item}
                onClick={() => onTypeToggle(item)}
                size="small"
                variant={isSelected ? 'contained' : 'outlined'}
              >
                {t(`options:model.${item}`)}
              </Button>
            );
          })}
        </Stack>
      }
    />
  );

  const renderCategories = () => {
    if (!isCategories) return;

    return (
      <Literal
        label="Filter by category:"
        value={
          <Stack direction="row" gap={0.5}>
            {categories.map((item) => {
              const isSelected = selectedFilter.categories.includes(item.id);

              return (
                <Button
                  key={item.id}
                  onClick={() => onCategoryToggle(item.id)}
                  size="small"
                  variant={isSelected ? 'contained' : 'outlined'}
                >
                  {item.name}
                </Button>
              );
            })}
          </Stack>
        }
      />
    );
  };

  const renderTags = () => {
    if (!isTags) return;

    return (
      <Literal
        label="Filter by tag:"
        value={
          <Stack direction="row" gap={0.5}>
            {tags.map((item) => {
              const isSelected = selectedFilter.tags.includes(item.id);

              return (
                <Button
                  key={item.id}
                  onClick={() => onTagToggle(item.id)}
                  size="small"
                  variant={isSelected ? 'contained' : 'outlined'}
                >
                  {item.name}
                </Button>
              );
            })}
          </Stack>
        }
      />
    );
  };

  const listOptionsMenu = useMemo(
    () =>
      [
        {
          name: 'selectAll',
          label: t('button.selectAll'),
          onClick: onSelectAll,
          hidden: selected.length === rawRows.length,
        },
        {
          name: 'deselectAll',
          label: t('button.deselectAll'),
          onClick: onDeselectedSelected,
          hidden: selected.length === 0,
        },
        {
          name: 'deleteSelected',
          label: t('button.deleteSelected'),
          onClick: onDeleteSelected,
          disabled: selected.length === 0,
          color: muiCommonColorVariantKeys.error,
          variant: 'contained',
        },
        {
          name: 'disableSelected',
          label: t('button.disableSelected'),
          onClick: onDisableSelected,
          disabled: selected.length === 0,
          color: muiCommonColorVariantKeys.warning,
          variant: 'contained',
        },
      ] as ({ label: string } & ButtonProps)[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSelectAll, selected.length, rawRows.length, onDeselectedSelected, onDeleteSelected, onDisableSelected]
  );

  return (
    <>
      <Card>
        <Stack gap={2}>
          <Stack direction="row" gap={1}>
            <Search value={query} onChange={(event) => onQueryChange(event.target.value)} fullWidth />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" gap={1}>
              {listOptionsMenu.map(({ name, label, onClick, disabled, hidden, color, ...rest }) => {
                if (hidden) return null;

                return (
                  <Button
                    key={name}
                    onClick={onClick}
                    disabled={disabled}
                    color={color ? color : muiCommonColorVariantKeys.inherit}
                    variant="outlined"
                    size="small"
                    {...rest}
                  >
                    {label}
                  </Button>
                );
              })}
            </Stack>
            {viewToggleEnabled ?? (
              <Stack>
                <Button variant="outlined" color="inherit" size="small" onClick={onViewToggle}>
                  {view}
                </Button>
              </Stack>
            )}
            <Stack direction="row" gap={1}>
              <Button color="inherit" variant="outlined" size="small" onClick={onFilterReset}>
                Reset filter
              </Button>

              <Button
                color="inherit"
                variant="outlined"
                size="small"
                onClick={() => {
                  setExpanded(!expanded);
                }}
              >
                Show {expanded ? t('button.less') : t('button.more')}
              </Button>
            </Stack>
          </Stack>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Stack gap={2}>
              <Grid container>
                <Grid size={8}>
                  <Literal
                    label="Sort by:"
                    value={
                      <Stack direction="row" gap={0.5}>
                        {orderKeys.map((key, index) => (
                          <Button
                            key={index}
                            variant={sortBy === key ? 'contained' : 'outlined'}
                            size="small"
                            onClick={() => onOrderBy(key)}
                          >
                            &nbsp;{t(`form:label.${String(key)}`)}&nbsp;
                            {key === sortBy && (
                              <>
                                {orderBy === listItemsSortOrderKeys.asc ? (
                                  <ArrowUpwardIcon fontSize="inherit" />
                                ) : (
                                  <ArrowDownwardIcon fontSize="inherit" />
                                )}
                              </>
                            )}
                          </Button>
                        ))}
                      </Stack>
                    }
                  />
                </Grid>
                <Grid size={4}>
                  <Stack alignItems="end">
                    <Literal
                      label="Rows per page"
                      value={
                        <Select
                          value={perPage}
                          onChange={(event) => onPerPageChange(Number(event.target.value))}
                          size="small"
                          items={getOptionsFromList(LIST_ITEMS_PER_PAGE_OPTIONS)}
                          sx={{ width: '150px' }}
                          fullWidth
                        />
                      }
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Stack gap={1}>
                {renderTypes()}
                {renderTags()}
                {renderCategories()}
              </Stack>
            </Stack>
          </Collapse>
        </Stack>
      </Card>
    </>
  );
};

export default ListItemsControls;
