import { useCallback, useMemo, useState } from 'react';
import { ItemBase } from '@common';
import { CheckboxState, ListItemsSelected, ListItemsSortOrder, ListItemsView, useListItemsControlProps } from './types';
import { searchItems, sortItems } from './helpers';
import { checkboxStateKeys, listItemsSortOrderKeys, listItemsViewKeys } from './enums';
import { LIST_ITEMS_PER_PAGE_DEFAULT, LIST_ITEMS_SORT_ATTRIBUTE_DEFAULT } from './constants';
import { useListItemsPagination } from './useListItemsPagination';

export const useListItemsControl = <T extends ItemBase>({
  items = [],
  initialView = listItemsViewKeys.table,
  initialOrderBy = listItemsSortOrderKeys.desc,
  initialSortBy = LIST_ITEMS_SORT_ATTRIBUTE_DEFAULT,
  searchKeys = [],
  itemsPerPage = LIST_ITEMS_PER_PAGE_DEFAULT,
  onRowSelect,
}: useListItemsControlProps<T>) => {
  const [view, setView] = useState<ListItemsView>(initialView);
  const [query, setQuery] = useState<string>('');
  const [orderBy, setOrderBy] = useState<ListItemsSortOrder>(initialOrderBy);
  const [sortBy, setSortBy] = useState<keyof T>(initialSortBy);
  const [selected, setSelected] = useState<ListItemsSelected>([]);

  const rawRows = searchItems(items, query, searchKeys);
  const sortedRows = [...rawRows].sort(sortItems(sortBy, orderBy));

  const { rows, ...restOfPagination } = useListItemsPagination<T>(sortedRows, itemsPerPage);

  const toggleViewHandler = useCallback(() => {
    setView(view === listItemsViewKeys.table ? listItemsViewKeys.tiles : listItemsViewKeys.table);
  }, [view]);

  const toggleOrderByHandler = useCallback(() => {
    setOrderBy(orderBy === listItemsSortOrderKeys.asc ? listItemsSortOrderKeys.desc : listItemsSortOrderKeys.asc);
  }, [orderBy]);

  const orderHandler = useCallback(
    (key: keyof T) => {
      setSortBy(key);
      if (key === sortBy) {
        toggleOrderByHandler();
      } else {
        setOrderBy(listItemsSortOrderKeys.desc);
      }
    },
    [sortBy, toggleOrderByHandler]
  );

  const selectHandler = useCallback(
    (id: number) => {
      const newSelected: ListItemsSelected = [...selected];
      const index = newSelected.indexOf(id);

      if (index > -1) {
        newSelected.splice(index, 1);
      } else {
        newSelected.push(id);
      }

      setSelected(newSelected);
      onRowSelect?.(newSelected);
    },
    [selected, onRowSelect]
  );

  const selectAllHandler = useCallback(() => {
    let newSelected: ListItemsSelected = [];

    if (selected.length >= 0) {
      newSelected = [];
      rawRows.forEach((item) => {
        newSelected.push(item.id);
      });
    }

    if (selected.length === rawRows.length) newSelected = [];

    setSelected(newSelected);
    onRowSelect?.(newSelected);
  }, [rawRows, selected, onRowSelect]);

  const deselectHandler = useCallback(() => setSelected([]), []);

  const checkboxState = useMemo<CheckboxState>(() => {
    if (selected.length === 0) return checkboxStateKeys.none;
    if (selected.length === rawRows.length) return checkboxStateKeys.checked;

    return checkboxStateKeys.indeterminate;
  }, [rawRows.length, selected.length]);

  return {
    rows: rows,
    rawRows,
    view,
    onViewChange: setView,
    onViewToggle: toggleViewHandler,
    query,
    onQueryChange: setQuery,
    orderBy,
    sortBy,
    onOrderBy: orderHandler,
    selected,
    checkboxState,
    onSelect: selectHandler,
    onSelectAll: selectAllHandler,
    onDeselect: deselectHandler,
    pagination: { ...restOfPagination },
  };
};
