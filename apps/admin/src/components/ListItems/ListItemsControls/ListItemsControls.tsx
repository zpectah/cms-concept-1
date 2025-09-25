import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Stack, ToggleButton, ToggleButtonGroup, Grid, Collapse, ButtonProps } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ItemBase } from '@common';
import { getConfig } from '../../../utils';
import { muiCommonColorVariantKeys } from '../../../enums';
import { useSelectOptions } from '../../../helpers';
import { Card } from '../../Card';
import { Search, Select } from '../../input';
import { listItemsSortOrderKeys } from '../enums';
import { ListItemsControlsProps } from '../types';
import { LIST_ITEMS_PER_PAGE_OPTIONS } from '../constants';

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
  onSelectAll,
  perPage,
  onPerPageChange,
}: ListItemsControlsProps<T>) => {
  const [expanded, setExpanded] = useState(false);

  const { viewToggleEnabled } = getConfig();
  const { t } = useTranslation(['common', 'form']);
  const { getOptionsFromList } = useSelectOptions();

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
              color={isSelected ? muiCommonColorVariantKeys.primary : muiCommonColorVariantKeys.inherit}
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
              color={isSelected ? muiCommonColorVariantKeys.primary : muiCommonColorVariantKeys.inherit}
            >
              {item.name}
            </Button>
          );
        })}
      </Stack>
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
            <Stack>
              <Button
                color="inherit"
                variant="outlined"
                size="small"
                onClick={() => {
                  setExpanded(!expanded);
                }}
              >
                {expanded ? t('button.less') : t('button.more')}
              </Button>
            </Stack>
          </Stack>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Stack gap={2}>
              <Grid container>
                <Grid size={8}>
                  <ToggleButtonGroup value={sortBy} exclusive>
                    {orderKeys?.map((key, index) => (
                      <ToggleButton key={index} value={key} onClick={() => onOrderBy(key)} size="small">
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
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Grid>
                <Grid size={4}>
                  <Stack alignItems="end">
                    <Select
                      value={perPage}
                      onChange={(event) => onPerPageChange(Number(event.target.value))}
                      size="small"
                      items={getOptionsFromList(LIST_ITEMS_PER_PAGE_OPTIONS)}
                      sx={{ width: '150px' }}
                      fullWidth
                    />
                  </Stack>
                </Grid>
              </Grid>
              {(isCategories || isTags) && (
                <Stack gap={1}>
                  {renderCategories()}
                  {renderTags()}
                </Stack>
              )}
            </Stack>
          </Collapse>
        </Stack>
      </Card>
    </>
  );
};

export default ListItemsControls;
