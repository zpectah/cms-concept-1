/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ItemBase } from '@common';
import { CheckboxState, ListItemsSelected, ListItemsSortOrder, ListItemsView, useListItemsControlProps } from './types';
import { searchItems, sortItems } from './helpers';
import { checkboxStateKeys, listItemsSortOrderKeys, listItemsViewKeys } from './enums';
import { LIST_ITEMS_PER_PAGE_DEFAULT, LIST_ITEMS_SORT_ATTRIBUTE_DEFAULT } from './constants';

export const useListItemsControl = <T extends ItemBase>({
  items = [],
  initialView = listItemsViewKeys.table,
  initialOrderBy = listItemsSortOrderKeys.desc,
  initialSortBy = LIST_ITEMS_SORT_ATTRIBUTE_DEFAULT,
  searchKeys = [],
  itemsPerPage = LIST_ITEMS_PER_PAGE_DEFAULT,
  onRowSelect,
  onSelectAll,
}: useListItemsControlProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialParams = {
    view: searchParams.get('view') || initialView,
    query: searchParams.get('query') || '',
    orderBy: searchParams.get('orderBy') || initialOrderBy,
    sortBy: searchParams.get('sortBy') || initialSortBy,
    page: Number(searchParams.get('page')) || 1,
    perPage: Number(searchParams.get('perPage')) || itemsPerPage,
  };

  const [view, setView] = useState<ListItemsView>(initialParams.view as ListItemsView);
  const [query, setQuery] = useState<string>(initialParams.query);
  const [orderBy, setOrderBy] = useState<ListItemsSortOrder>(initialParams.orderBy as ListItemsSortOrder);
  const [sortBy, setSortBy] = useState<keyof T>(initialParams.sortBy as keyof T);
  const [page, setPage] = useState(initialParams.page);
  const [perPage, setPerPage] = useState(initialParams.perPage);

  // TODO #save to SM
  const [selected, setSelected] = useState<ListItemsSelected>([]);

  const rawRows = searchItems(items, query, searchKeys);
  const sortedRows = [...rawRows].sort(sortItems(sortBy, orderBy));
  const pages = Math.max(1, Math.ceil(items.length / perPage));

  const isFirstDisabled = page === 1;
  const isLastDisabled = page === pages;

  const rows = useMemo(() => {
    const start = (page - 1) * perPage;

    return sortedRows.slice(start, start + perPage);
  }, [sortedRows, page, perPage]);

  const updateParams = (newParams: Record<string, string | number>) =>
    setSearchParams((params) => {
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === '') {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      return params;
    });

  const pageChangeHandler = (page: number) => {
    setPage(page);
    updateParams({ page });
  };

  const pagePerPageChangeHandler = (perPage: number) => {
    setPerPage(perPage);
    updateParams({ perPage, page: 1 });
    setPage(1);
  };

  const onPageNextHandler = useCallback(() => pageChangeHandler(Math.min(page + 1, pages)), [page, pages]);
  const onPagePrevHandler = useCallback(() => pageChangeHandler(Math.max(page - 1, 1)), [page]);
  const onPageFirstHandler = useCallback(() => pageChangeHandler(1), []);
  const onPageLastHandler = useCallback(() => pageChangeHandler(pages), [pages]);

  const toggleViewHandler = useCallback(() => {
    const newView = view === listItemsViewKeys.table ? listItemsViewKeys.tiles : listItemsViewKeys.table;

    setView(newView);
    updateParams({ view: newView });
  }, [view]);

  const toggleOrderByHandler = useCallback(() => {
    const newOrderBy =
      orderBy === listItemsSortOrderKeys.asc ? listItemsSortOrderKeys.desc : listItemsSortOrderKeys.asc;

    setOrderBy(newOrderBy);
    updateParams({ orderBy: newOrderBy });
  }, [orderBy]);

  const orderHandler = useCallback(
    (key: keyof T) => {
      setSortBy(key);
      if (key === sortBy) {
        const newOrderBy =
          orderBy === listItemsSortOrderKeys.asc ? listItemsSortOrderKeys.desc : listItemsSortOrderKeys.asc;

        setOrderBy(newOrderBy);
        updateParams({
          sortBy: key as string,
          orderBy: newOrderBy,
        });
      } else {
        setOrderBy(listItemsSortOrderKeys.desc);
        updateParams({ orderBy: listItemsSortOrderKeys.desc, sortBy: key as string });
      }
    },
    [sortBy, orderBy, toggleOrderByHandler]
  );

  const queryChangeHandler = (query: string) => {
    setQuery(query);
    updateParams({ query });
  };

  const selectRowHandler = useCallback(
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
    onSelectAll?.(newSelected);
  }, [rawRows, selected, onRowSelect]);

  const deselectHandler = useCallback(() => setSelected([]), []);

  const checkboxState = useMemo<CheckboxState>(() => {
    if (selected.length === 0) return checkboxStateKeys.none;
    if (selected.length === rawRows.length) return checkboxStateKeys.checked;

    return checkboxStateKeys.indeterminate;
  }, [rawRows.length, selected.length]);

  return {
    rows,
    rawRows,
    view,
    onViewChange: setView,
    onViewToggle: toggleViewHandler,
    query,
    onQueryChange: queryChangeHandler,
    orderBy,
    sortBy,
    onOrderBy: orderHandler,
    selected,
    checkboxState,
    onSelect: selectRowHandler,
    onSelectAll: selectAllHandler,
    onDeselect: deselectHandler,
    pagination: {
      page,
      pages,
      perPage,
      onPageNext: onPageNextHandler,
      onPagePrev: onPagePrevHandler,
      onPageFirst: onPageFirstHandler,
      onPageLast: onPageLastHandler,
      disabledButton: {
        first: isFirstDisabled,
        prev: isFirstDisabled,
        next: isLastDisabled,
        last: isLastDisabled,
      },
      onPerPageChange: pagePerPageChangeHandler,
      onPageChange: pageChangeHandler,
    },
  };
};
