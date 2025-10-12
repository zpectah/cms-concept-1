import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ItemBase } from '@common';
import { useViewLayoutContext } from '../layout';
import { Content } from '../Content';
import { ListItemsProps } from './types';
import { listItemsViewKeys } from './enums';
import { useListItemsControl } from './useListItemsControl';
import { ListItemsControls } from './ListItemsControls';
import { ListItemsPagination } from './ListItemsPagination';
import { TableView } from './TableView';
import { TilesView } from './TilesView';
import { AttachmentsView } from './AttachmentsView';

const ListItems = <T extends ItemBase>({
  name,
  model,
  isLoading,
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
  disableViewToggle = true,
  categories = [],
  tags = [],
  initialView = listItemsViewKeys.table,
  disableFavorites,
  renderSelectedActions,
  renderRowActions,
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
    onFilterReset,
  } = useListItemsControl({
    model,
    items,
    searchKeys,
    onRowSelect,
    onSelectAll,
    categories,
    tags,
    initialView,
  });
  const { openConfirmDialog } = useViewLayoutContext();
  const navigate = useNavigate();

  const {
    types: typesOptions,
    categories: categoriesOptions,
    tags: tagsOptions,
    onCategoryToggle,
    onTagToggle,
    onTypeToggle,
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

  const renderView = () => {
    switch (view) {
      case listItemsViewKeys.tiles:
        return (
          <TilesView<T>
            model={model}
            name={name}
            pathPrefix={pathPrefix}
            rows={rows}
            selected={selected}
            onSelect={onSelect}
            onDetail={rowDetailHandler}
            onDelete={rowDeleteHandler}
            onDisable={rowDisableHandler}
            isLoading={isLoading}
            disableFavorites={disableFavorites}
            renderRowActions={renderRowActions}
          />
        );

      case listItemsViewKeys.attachments:
        return (
          <AttachmentsView<T>
            model={model}
            name={name}
            pathPrefix={pathPrefix}
            rows={rows}
            selected={selected}
            onSelect={onSelect}
            onDetail={rowDetailHandler}
            onDelete={rowDeleteHandler}
            onDisable={rowDisableHandler}
            isLoading={isLoading}
            disableFavorites={disableFavorites}
            renderRowActions={renderRowActions}
          />
        );

      case listItemsViewKeys.table:
      default:
        return (
          <TableView<T>
            model={model}
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
            disableFavorites={disableFavorites}
            renderRowActions={renderRowActions}
          />
        );
    }
  };

  return (
    <Content>
      <ListItemsControls<T>
        model={model}
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
        sortBy={sortBy as keyof T}
        onDeselectedSelected={deselectedSelectedHandler}
        onDeleteSelected={deleteSelectedHandler}
        onDisableSelected={disableSelectedHandler}
        selectedFilter={selectedFilter}
        isCategories={isCategories}
        categories={categoriesOptions}
        onCategoryToggle={onCategoryToggle}
        onTypeToggle={onTypeToggle}
        isTags={isTags}
        tags={tagsOptions}
        onTagToggle={onTagToggle}
        onSelectAll={onSelectAllRows}
        perPage={pagination.perPage}
        onPerPageChange={pagination.onPerPageChange}
        types={typesOptions}
        onFilterReset={onFilterReset}
        rowsOnPage={rows.length}
        renderSelectedActions={renderSelectedActions}
      />
      {renderView()}
      <ListItemsPagination {...pagination} />
    </Content>
  );
};

export default ListItems;
