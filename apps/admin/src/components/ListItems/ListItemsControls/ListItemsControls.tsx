import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Stack, Grid, Collapse, ButtonProps, Divider, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ItemBase } from '@common';
import { getConfig } from '../../../utils';
import { muiCommonColorVariantKeys } from '../../../enums';
import { Card } from '../../Card';
import { Literal } from '../../Literal';
import { Search } from '../../input';
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
  rowsOnPage,
}: ListItemsControlsProps<T>) => {
  const { viewToggleEnabled } = getConfig();
  const { t } = useTranslation(['common', 'form', 'options', 'components']);

  const [expanded, setExpanded] = useState(false);

  const selectOptionsItems = [
    {
      name: 'selectAll',
      label: t('button.selectAll'),
      onClick: onSelectAll,
      hidden: selected.length === rawRows.length && rawRows.length >= 0,
    },
    {
      name: 'deselectAll',
      label: t('button.deselectAll'),
      onClick: onDeselectedSelected,
      hidden: selected.length === 0 && rawRows.length >= 0,
      variant: 'contained',
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
  ] as ({ label: string } & ButtonProps)[];

  const renderTypes = () => (
    <Literal
      label={t('components:ListItems.filterByType')}
      value={
        <Stack direction="row" gap={0.5}>
          {types.map((item) => {
            const isSelected = selectedFilter.types.includes(item);

            return (
              <Button
                key={item}
                onClick={() => onTypeToggle(item)}
                size="small"
                color={muiCommonColorVariantKeys.info}
                variant={isSelected ? 'contained' : 'outlined'}
                disabled={types.length <= 1}
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
        label={t('components:ListItems.filterByCategories')}
        value={
          <Stack direction="row" gap={0.5}>
            {categories.map((item) => {
              const isSelected = selectedFilter.categories.includes(item.id);

              return (
                <Button
                  key={item.id}
                  onClick={() => onCategoryToggle(item.id)}
                  size="small"
                  color={muiCommonColorVariantKeys.info}
                  variant={isSelected ? 'contained' : 'outlined'}
                  disabled={categories.length <= 1}
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
        label={t('components:ListItems.filterByTags')}
        value={
          <Stack direction="row" gap={0.5}>
            {tags.map((item) => {
              const isSelected = selectedFilter.tags.includes(item.id);

              return (
                <Button
                  key={item.id}
                  onClick={() => onTagToggle(item.id)}
                  size="small"
                  color={muiCommonColorVariantKeys.info}
                  variant={isSelected ? 'contained' : 'outlined'}
                  disabled={tags.length <= 1}
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

  const renderSortBy = () => (
    <Literal
      label={t('components:ListItems.sortBy')}
      value={
        <Stack direction="row" gap={0.5}>
          {orderKeys.map((key, index) => (
            <Button
              key={index}
              variant={sortBy === key ? 'contained' : 'outlined'}
              size="small"
              color={muiCommonColorVariantKeys.info}
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
  );

  const renderListOptionsMenu = () => (
    <Stack direction="row" gap={0.5}>
      {selectOptionsItems.map(({ name, label, onClick, disabled, hidden, color, ...rest }) => {
        if (hidden) return null;

        return (
          <Button
            variant="outlined"
            size="small"
            key={name}
            onClick={onClick}
            disabled={disabled}
            color={color ?? color}
            {...rest}
          >
            {label}
          </Button>
        );
      })}

      <Stack direction="row" alignItems="center">
        &nbsp;
        <Typography variant="button">
          {rawRows.length}&nbsp;({rowsOnPage})
        </Typography>
      </Stack>
    </Stack>
  );

  const renderRowsPerPage = () => (
    <Literal
      label={t('components:ListItems.rowsPerPage')}
      value={
        <Stack direction="row" gap={0.5}>
          {LIST_ITEMS_PER_PAGE_OPTIONS.map((item) => (
            <Button
              key={`id_${item}`}
              size="small"
              onClick={() => onPerPageChange(item)}
              variant={perPage === item ? 'contained' : 'outlined'}
              color={muiCommonColorVariantKeys.info}
            >
              {item}
            </Button>
          ))}
        </Stack>
      }
    />
  );

  return (
    <Card>
      <Stack direction="column" gap={2}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Search
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              fullWidth
              placeholder={t('components:ListItems.searchInputPlaceholder')}
            />
          </Grid>
          <Grid size={6}>{renderListOptionsMenu()}</Grid>
          <Grid size={6}>
            <Stack direction="row" gap={1} justifyContent="end">
              {viewToggleEnabled ?? (
                <Button variant="outlined" color="inherit" size="small" onClick={onViewToggle}>
                  {view}
                </Button>
              )}
              <Button color="warning" variant="outlined" size="small" onClick={onFilterReset}>
                {t('components:ListItems.resetFilter')}
              </Button>
              <Button
                variant={expanded ? 'contained' : 'outlined'}
                size="small"
                onClick={() => {
                  setExpanded(!expanded);
                }}
              >
                {expanded ? t('components:ListItems.showLess') : t('components:ListItems.showMore')}
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2}>
            <Grid size={6}>{renderSortBy()}</Grid>
            <Grid size={6}>{renderRowsPerPage()}</Grid>
            <Grid size={12}>{renderTypes()}</Grid>
            {isTags && <Grid size={12}>{renderTags()}</Grid>}
            {isCategories && <Grid size={12}>{renderCategories()}</Grid>}
          </Grid>
        </Collapse>
      </Stack>
    </Card>
  );
};

export default ListItemsControls;
