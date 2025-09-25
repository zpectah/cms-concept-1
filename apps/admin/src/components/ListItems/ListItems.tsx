import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import { ItemBase } from '@common';
import { useViewLayoutContext } from '../layout';
import { ListItemsProps } from './types';
import { listItemsViewKeys } from './enums';
import { useListItemsControl } from './useListItemsControl';
import { ListItemsControls } from './ListItemsControls';
import { ListItemsPagination } from './ListItemsPagination';
import { TableView } from './TableView';
import { TilesView } from './TilesView';

const ListItems = <T extends ItemBase>({
  name,
  initialView,
  isLoading,
  itemsPerPage,
  items = [],
  columns = [],
  searchKeys = [],
  orderKeys = [],
  onRowSelect,
  onDeleteSelected,
  onDisableSelected,
  onRowDelete,
  onRowDisable,
  onRowDetail,
  onSelectAll,
  pathPrefix,
  disableViewToggle,
  categories = [],
  tags = [],
}: ListItemsProps<T>) => {
  const { t } = useTranslation();
  const {
    rows,
    rawRows,
    query,
    onQueryChange,
    orderBy,
    onOrderBy,
    sortBy,
    view,
    onViewToggle,
    selected,
    checkboxState,
    onSelect,
    onSelectAll: onSelectAllRows,
    onDeselect,
    pagination,
    filter,
  } = useListItemsControl({
    items,
    initialView,
    searchKeys,
    itemsPerPage,
    onRowSelect,
    onSelectAll,
    categories,
    tags,
  });
  const { openConfirmDialog } = useViewLayoutContext();
  const navigate = useNavigate();

  const {
    categories: categoriesOptions,
    tags: tagsOptions,
    onCategoryToggle,
    onTagToggle,
    selected: selectedFilter,
  } = filter;

  const isCategories = categories?.length > 0;
  const isTags = tags?.length > 0;

  const deselectedSelectedHandler = () => onDeselect();

  const rowDisableHandler = (id: number) => onRowDisable?.(id);

  const rowDetailHandler = (id: number) => {
    onRowDetail?.(id);
    navigate(`${pathPrefix}/${id}`);
  };

  const disableSelectedHandler = useCallback(() => {
    onDisableSelected?.(selected);
    onDeselect();
  }, [onDisableSelected, onDeselect, selected]);

  const rowDeleteHandler = (id: number) => {
    openConfirmDialog({
      title: t('message.confirm.deleteRow.title'),
      content: t('message.confirm.deleteRow.content'),
      onConfirm: () => onRowDelete?.(id),
    });
  };

  const deleteSelectedHandler = useCallback(() => {
    openConfirmDialog({
      title: t('message.confirm.deleteSelected.title'),
      content: t('message.confirm.deleteSelected.content'),
      onConfirm: () => {
        onDeleteSelected?.(selected);
        onDeselect();
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDeleteSelected, onDeselect, selected]);

  return (
    <Stack gap={2}>
      <ListItemsControls<T>
        disableViewToggle={disableViewToggle}
        view={view}
        onViewToggle={onViewToggle}
        query={query}
        onQueryChange={onQueryChange}
        rawRows={rawRows}
        selected={selected}
        orderKeys={orderKeys}
        orderBy={orderBy}
        onOrderBy={onOrderBy}
        sortBy={sortBy}
        onDeselectedSelected={deselectedSelectedHandler}
        onDeleteSelected={deleteSelectedHandler}
        onDisableSelected={disableSelectedHandler}
        selectedFilter={selectedFilter}
        isCategories={isCategories}
        categories={categoriesOptions}
        onCategoryToggle={onCategoryToggle}
        isTags={isTags}
        tags={tagsOptions}
        onTagToggle={onTagToggle}
        onSelectAll={onSelectAllRows}
        perPage={pagination.perPage}
        onPerPageChange={pagination.onPerPageChange}
      />
      {view === listItemsViewKeys.table ? (
        <TableView<T>
          name={name}
          pathPrefix={pathPrefix}
          rows={rows}
          selected={selected}
          onSelect={onSelect}
          onDetail={rowDetailHandler}
          onDelete={rowDeleteHandler}
          onDisable={rowDisableHandler}
          onSelectAll={onSelectAllRows}
          columns={columns}
          checkboxState={checkboxState}
          isLoading={isLoading}
        />
      ) : (
        <TilesView<T>
          name={name}
          pathPrefix={pathPrefix}
          rows={rows}
          selected={selected}
          onSelect={onSelect}
          onDetail={rowDetailHandler}
          onDelete={rowDeleteHandler}
          onDisable={rowDisableHandler}
          isLoading={isLoading}
        />
      )}
      <ListItemsPagination {...pagination} />
    </Stack>
  );
};

export default ListItems;
