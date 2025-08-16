import { useCallback, useMemo, useState } from 'react';
import { ItemBase } from '@common';
import { ListItemsSortOrder, ListItemsView, useListItemsControlProps } from './types';
import { searchItems, sortItems } from './helpers';
import { listItemsSortOrderKeys, listItemsViewKeys } from './enums';
import { LIST_ITEMS_PER_PAGE_DEFAULT, LIST_ITEMS_SORT_ATTRIBUTE_DEFAULT } from './constants';
import { useListItemsPagination } from './useListItemsPagination';

export const useListItemsControl = <T extends ItemBase>({
  items = [],
  initialView,
  initialOrderBy,
  initialSortBy,
  searchKeys = [],
  itemsPerPage = LIST_ITEMS_PER_PAGE_DEFAULT,
  onRowSelect,
}: useListItemsControlProps<T>) => {
  const [view, setView] = useState<ListItemsView>(initialView ?? listItemsViewKeys.rows);
  const [query, setQuery] = useState<string>('');
  const [orderBy, setOrderBy] = useState<ListItemsSortOrder>(initialOrderBy ?? listItemsSortOrderKeys.desc);
  const [sortBy, setSortBy] = useState<keyof T>(initialSortBy ?? LIST_ITEMS_SORT_ATTRIBUTE_DEFAULT);
  const [selected, setSelected] = useState<number[]>([]);

  const rawRows = searchItems(items, query, searchKeys);
  const sortedRows = [...rawRows].sort(sortItems(sortBy, orderBy));

  const { rows, ...restOfPagination } = useListItemsPagination<T>(sortedRows, itemsPerPage);

  const toggleOrderByHandler = useCallback(() => {
    if (orderBy === listItemsSortOrderKeys.asc) {
      setOrderBy(listItemsSortOrderKeys.desc);
    } else {
      setOrderBy(listItemsSortOrderKeys.asc);
    }
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

  const toggleViewHandler = useCallback(() => {
    if (view === listItemsViewKeys.rows) {
      setView(listItemsViewKeys.tiles);
    } else {
      setView(listItemsViewKeys.rows);
    }
  }, [view]);

  const selectHandler = useCallback(
    (id: number) => {
      const newSelected = [...selected];
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
    let newSelected: number[] = [];

    if (selected.length >= 0) {
      newSelected = [];
      rawRows.forEach((item) => {
        newSelected.push(item.id);
      });
    }

    if (selected.length === rawRows.length) {
      newSelected = [];
    }

    setSelected(newSelected);
    onRowSelect?.(newSelected);
  }, [rawRows, selected, onRowSelect]);

  const deselectHandler = useCallback(() => setSelected([]), []);

  const checkboxState = useMemo(() => {
    let state = 'none';

    if (selected.length === 0) return state;

    if (selected.length < rawRows.length) state = 'indeterminate';
    if (selected.length === rawRows.length) state = 'checked';

    return state;
  }, [rawRows, selected]);

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
    pagination: restOfPagination,
  };
};
