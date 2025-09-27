/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useMemo } from 'react';
import { ItemBase, Categories, Tags } from '@common';
import { CheckboxState, ListItemsPagination, ListItemsSelected, useListItemsControlProps } from './types';
import { searchItems, sortItems } from './helpers';
import { checkboxStateKeys, listItemsSortOrderKeys, listItemsViewKeys } from './enums';
import useModelListStore from '../../store/useModelListStore';

export const useListItemsControl = <T extends ItemBase>({
  model,
  items = [],
  searchKeys = [],
  onRowSelect,
  onSelectAll,
  categories = [],
  tags = [],
}: useListItemsControlProps<T>) => {
  const {
    model: modelStore,
    setView,
    setPage,
    setPerPage,
    setQuery,
    setOrderBy,
    setSortBy,
    setSelected,
    setFilter,
  } = useModelListStore();

  const rawRows = searchItems(items, modelStore[model].query, searchKeys);

  const filteredRows = useMemo(() => {
    return [...rawRows]
      .filter((item) => {
        if (modelStore[model].filter.types.length === 0) return true;

        return item.type && modelStore[model].filter.types.includes(item.type);
      })
      .filter((item) => {
        if (modelStore[model].filter.categories.length === 0) return true;

        const categories = (item as T & { categories?: number[] }).categories ?? [];

        return categories.some((c) => modelStore[model].filter.categories.includes(c));
      })
      .filter((item) => {
        if (modelStore[model].filter.tags.length === 0) return true;

        const tags = (item as T & { tags?: number[] }).tags ?? [];

        return tags.some((t) => modelStore[model].filter.tags.includes(t));
      })
      .sort(sortItems(modelStore[model].sortBy as keyof T, modelStore[model].orderBy));
  }, [rawRows, modelStore[model].filter, modelStore[model].sortBy, modelStore[model].orderBy]);

  const pages = Math.max(1, Math.ceil(filteredRows.length / modelStore[model].perPage));
  const isFirstDisabled = modelStore[model].page === 1;
  const isLastDisabled = modelStore[model].page === pages;

  const rows = useMemo(() => {
    const start = (modelStore[model].page - 1) * modelStore[model].perPage;

    return filteredRows.slice(start, start + modelStore[model].perPage);
  }, [filteredRows, modelStore[model].page, modelStore[model].perPage]);

  const pageChangeHandler = (page: number) => setPage(model, page);

  const pagePerPageChangeHandler = (perPage: number) => {
    setPerPage(model, perPage);
    setPage(model, 1);
  };

  const onPageNextHandler = useCallback(
    () => pageChangeHandler(Math.min(modelStore[model].page + 1, pages)),
    [modelStore[model].page, pages]
  );
  const onPagePrevHandler = useCallback(
    () => pageChangeHandler(Math.max(modelStore[model].page - 1, 1)),
    [modelStore[model].page]
  );
  const onPageFirstHandler = useCallback(() => pageChangeHandler(1), []);
  const onPageLastHandler = useCallback(() => pageChangeHandler(pages), [pages]);

  const toggleViewHandler = useCallback(() => {
    const newView =
      modelStore[model].view === listItemsViewKeys.table ? listItemsViewKeys.tiles : listItemsViewKeys.table;

    setView(model, newView);
  }, [modelStore[model].view]);

  const toggleOrderByHandler = useCallback(() => {
    const newOrderBy =
      modelStore[model].orderBy === listItemsSortOrderKeys.asc
        ? listItemsSortOrderKeys.desc
        : listItemsSortOrderKeys.asc;

    setOrderBy(model, newOrderBy);
  }, [modelStore[model].orderBy]);

  const orderHandler = useCallback(
    (key: keyof T) => {
      setSortBy(model, key as string);
      if (key === modelStore[model].sortBy) {
        const newOrderBy =
          modelStore[model].orderBy === listItemsSortOrderKeys.asc
            ? listItemsSortOrderKeys.desc
            : listItemsSortOrderKeys.asc;

        setOrderBy(model, newOrderBy);
      } else {
        setOrderBy(model, listItemsSortOrderKeys.desc);
      }
    },
    [modelStore[model].sortBy, modelStore[model].orderBy, toggleOrderByHandler]
  );

  const queryChangeHandler = (query: string) => setQuery(model, query);

  const selectRowHandler = useCallback(
    (id: number) => {
      const newSelected: ListItemsSelected = [...modelStore[model].selected];
      const index = newSelected.indexOf(id);

      if (index > -1) {
        newSelected.splice(index, 1);
      } else {
        newSelected.push(id);
      }

      setSelected(model, newSelected);
      onRowSelect?.(newSelected);
    },
    [modelStore[model].selected, onRowSelect]
  );

  const selectAllHandler = useCallback(() => {
    let newSelected: ListItemsSelected = [];

    if (modelStore[model].selected.length >= 0) {
      newSelected = [];
      filteredRows.forEach((item) => {
        newSelected.push(item.id);
      });
    }

    if (modelStore[model].selected.length === filteredRows.length) newSelected = [];

    setSelected(model, newSelected);
    onSelectAll?.(newSelected);
  }, [filteredRows, modelStore[model].selected, onRowSelect]);

  const deselectHandler = useCallback(() => setSelected(model, []), []);

  const checkboxState = useMemo<CheckboxState>(() => {
    if (modelStore[model].selected.length === 0) return checkboxStateKeys.none;
    if (modelStore[model].selected.length === filteredRows.length) return checkboxStateKeys.checked;

    return checkboxStateKeys.indeterminate;
  }, [filteredRows, modelStore[model].selected]);

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
      const newSelected: string[] = [...modelStore[model].filter.types];
      const index = newSelected.indexOf(type);

      if (index > -1) {
        newSelected.splice(index, 1);
      } else {
        newSelected.push(type);
      }

      setFilter(model, { types: newSelected });
    },
    [modelStore[model].filter]
  );

  const toggleSelectCategoriesHandler = useCallback(
    (id: number) => {
      const newSelected: ListItemsSelected = [...modelStore[model].filter.categories];
      const index = newSelected.indexOf(id);

      if (index > -1) {
        newSelected.splice(index, 1);
      } else {
        newSelected.push(id);
      }

      setFilter(model, { categories: newSelected });
    },
    [modelStore[model].filter]
  );

  const toggleSelectTagsHandler = useCallback(
    (id: number) => {
      const newSelected: ListItemsSelected = [...modelStore[model].filter.tags];
      const index = newSelected.indexOf(id);

      if (index > -1) {
        newSelected.splice(index, 1);
      } else {
        newSelected.push(id);
      }

      setFilter(model, { tags: newSelected });
    },
    [modelStore[model].filter]
  );

  const pagination: ListItemsPagination = {
    page: modelStore[model].page,
    pages,
    perPage: modelStore[model].perPage,
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

  return {
    rows,
    rawRows: filteredRows,
    view: modelStore[model].view,
    onViewChange: setView,
    onViewToggle: toggleViewHandler,
    query: modelStore[model].query,
    onQueryChange: queryChangeHandler,
    orderBy: modelStore[model].orderBy,
    sortBy: modelStore[model].sortBy,
    onOrderBy: orderHandler,
    selected: modelStore[model].selected,
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
      selected: modelStore[model].filter,
      onTypeToggle: toggleSelectTypesHandler,
    },
  };
};
