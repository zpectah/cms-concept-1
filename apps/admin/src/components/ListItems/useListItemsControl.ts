/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ItemBase, Categories, Tags } from '@common';
import {
  CheckboxState,
  ListItemsFilter,
  ListItemsPagination,
  ListItemsSelected,
  ListItemsSortOrder,
  ListItemsView,
  useListItemsControlProps,
} from './types';
import { searchItems, sortItems } from './helpers';
import { checkboxStateKeys, listItemsControlParamsKeys, listItemsSortOrderKeys, listItemsViewKeys } from './enums';
import { LIST_ITEMS_PER_PAGE_DEFAULT, LIST_ITEMS_SORT_ATTRIBUTE_DEFAULT } from './constants';

export const useListItemsControl = <T extends ItemBase>({
  model,
  items = [],
  initialView = listItemsViewKeys.table,
  initialOrderBy = listItemsSortOrderKeys.desc,
  initialSortBy = LIST_ITEMS_SORT_ATTRIBUTE_DEFAULT,
  searchKeys = [],
  itemsPerPage = LIST_ITEMS_PER_PAGE_DEFAULT,
  onRowSelect,
  onSelectAll,
  categories = [],
  tags = [],
}: useListItemsControlProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialParams = {
    view: searchParams.get(listItemsControlParamsKeys.view) || initialView,
    query: searchParams.get(listItemsControlParamsKeys.query) || '',
    orderBy: searchParams.get(listItemsControlParamsKeys.orderBy) || initialOrderBy,
    sortBy: searchParams.get(listItemsControlParamsKeys.sortBy) || initialSortBy,
    page: Number(searchParams.get(listItemsControlParamsKeys.page)) || 1,
    perPage: Number(searchParams.get(listItemsControlParamsKeys.perPage)) || itemsPerPage,
  };

  const [view, setView] = useState<ListItemsView>(initialParams.view as ListItemsView);
  const [query, setQuery] = useState<string>(initialParams.query);
  const [orderBy, setOrderBy] = useState<ListItemsSortOrder>(initialParams.orderBy as ListItemsSortOrder);
  const [sortBy, setSortBy] = useState<keyof T>(initialParams.sortBy as keyof T);
  const [page, setPage] = useState(initialParams.page);
  const [perPage, setPerPage] = useState(initialParams.perPage);
  const [selected, setSelected] = useState<ListItemsSelected>([]);
  const [filter, setFilter] = useState<ListItemsFilter>({ types: [], categories: [], tags: [] });

  const rawRows = searchItems(items, query, searchKeys);

  const filteredRows = useMemo(() => {
    return [...rawRows]
      .filter((item) => {
        if (filter.types.length === 0) return true;

        return item.type && filter.types.includes(item.type);
      })
      .filter((item) => {
        if (filter.categories.length === 0) return true;

        const categories = (item as T & { categories?: number[] }).categories ?? [];

        return categories.some((c) => filter.categories.includes(c));
      })
      .filter((item) => {
        if (filter.tags.length === 0) return true;

        const tags = (item as T & { tags?: number[] }).tags ?? [];

        return tags.some((t) => filter.tags.includes(t));
      })
      .sort(sortItems(sortBy, orderBy));
  }, [rawRows, filter, sortBy, orderBy]);

  const pages = Math.max(1, Math.ceil(filteredRows.length / perPage));
  const isFirstDisabled = page === 1;
  const isLastDisabled = page === pages;

  const rows = useMemo(() => {
    const start = (page - 1) * perPage;

    return filteredRows.slice(start, start + perPage);
  }, [filteredRows, page, perPage]);

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
      filteredRows.forEach((item) => {
        newSelected.push(item.id);
      });
    }

    if (selected.length === filteredRows.length) newSelected = [];

    setSelected(newSelected);
    onSelectAll?.(newSelected);
  }, [filteredRows, selected, onRowSelect]);

  const deselectHandler = useCallback(() => setSelected([]), []);

  const checkboxState = useMemo<CheckboxState>(() => {
    if (selected.length === 0) return checkboxStateKeys.none;
    if (selected.length === filteredRows.length) return checkboxStateKeys.checked;

    return checkboxStateKeys.indeterminate;
  }, [filteredRows, selected]);

  const typeOptions = () => {
    const types: string[] = [];

    // We know there is type attribute to filter
    rawRows.forEach((item) => {
      const type = item.type;

      if (!type) return;

      if (types.indexOf(type) < 0) types.push(type);
    });

    return types;
  };

  const categoriesOptions = useMemo(() => {
    const ids: number[] = [];
    const objects: Categories = [];

    if (!categories) return [];

    // We know there is categories attribute to filter
    items.forEach((item) => {
      const value = (item as T & { categories: number[] })?.categories;

      if (value && value.length > 0) {
        value.forEach((id) => {
          ids.push(id);
        });
      }
    });

    // We iterate sorted ids to find category object
    [...new Set(ids)].forEach((id) => {
      const object = categories.find((ctg) => ctg.id === id);

      if (object) objects.push(object);
    });

    return objects;
  }, [items, categories]);

  const tagsOptions = useMemo(() => {
    const ids: number[] = [];
    const objects: Tags = [];

    if (!tags) return [];

    // We know there is tags attribute to filter
    items.forEach((item) => {
      const value = (item as T & { tags: number[] })?.tags;

      if (value && value.length > 0) {
        value.forEach((id) => {
          ids.push(id);
        });
      }
    });

    // We iterate sorted ids to find tag object
    [...new Set(ids)].forEach((id) => {
      const object = tags.find((ctg) => ctg.id === id);

      if (object) objects.push(object);
    });

    return objects;
  }, [items, tags]);

  const toggleSelectTypesHandler = useCallback(
    (type: string) => {
      const newSelected: string[] = [...filter.types];
      const index = newSelected.indexOf(type);

      if (index > -1) {
        newSelected.splice(index, 1);
      } else {
        newSelected.push(type);
      }

      setFilter((prevState) => ({ ...prevState, types: newSelected }));
    },
    [filter]
  );

  const toggleSelectCategoriesHandler = useCallback(
    (id: number) => {
      const newSelected: ListItemsSelected = [...filter.categories];
      const index = newSelected.indexOf(id);

      if (index > -1) {
        newSelected.splice(index, 1);
      } else {
        newSelected.push(id);
      }

      setFilter((prevState) => ({ ...prevState, categories: newSelected }));
    },
    [filter]
  );

  const toggleSelectTagsHandler = useCallback(
    (id: number) => {
      const newSelected: ListItemsSelected = [...filter.tags];
      const index = newSelected.indexOf(id);

      if (index > -1) {
        newSelected.splice(index, 1);
      } else {
        newSelected.push(id);
      }

      setFilter((prevState) => ({ ...prevState, tags: newSelected }));
    },
    [filter]
  );

  const pagination: ListItemsPagination = {
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
  };

  useEffect(() => {
    const updatedParams = {
      view: searchParams.get(listItemsControlParamsKeys.view),
      query: searchParams.get(listItemsControlParamsKeys.query),
      orderBy: searchParams.get(listItemsControlParamsKeys.orderBy),
      sortBy: searchParams.get(listItemsControlParamsKeys.sortBy),
      page: Number(searchParams.get(listItemsControlParamsKeys.page)),
      perPage: Number(searchParams.get(listItemsControlParamsKeys.perPage)),
    };

    if (updatedParams.view) setView(updatedParams.view as ListItemsView);
    if (updatedParams.query) setQuery(updatedParams.query);
    if (updatedParams.orderBy) setOrderBy(updatedParams.orderBy as ListItemsSortOrder);
    if (updatedParams.sortBy) setSortBy(updatedParams.sortBy as keyof T);
    if (updatedParams.page) setPage(updatedParams.page);
    if (updatedParams.perPage) setPerPage(updatedParams.perPage);
  }, [searchParams]);

  return {
    rows,
    rawRows: filteredRows,
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
    pagination,
    filter: {
      types: typeOptions(),
      categories: categoriesOptions,
      tags: tagsOptions,
      onCategoryToggle: toggleSelectCategoriesHandler,
      onTagToggle: toggleSelectTagsHandler,
      selected: filter,
      onTypeToggle: toggleSelectTypesHandler,
    },
  };
};
