import { useState, useMemo, useCallback } from 'react';
import { ItemBase } from '@common';
import { LIST_ITEMS_PER_PAGE_DEFAULT } from './constants';

export const useListItemsPagination = <T extends ItemBase>(
  items: T[],
  itemsPerPage: number = LIST_ITEMS_PER_PAGE_DEFAULT
) => {
  const [page, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(itemsPerPage);

  const pages = Math.max(1, Math.ceil(items.length / perPage));

  const rows = useMemo(() => {
    const start = (page - 1) * perPage;

    return items.slice(start, start + perPage);
  }, [items, page, perPage]);

  const onPageNextHandler = useCallback(() => setCurrentPage((p) => Math.min(p + 1, pages)), [pages]);
  const onPagePrevHandler = useCallback(() => setCurrentPage((p) => Math.max(p - 1, 1)), []);
  const onPageFirstHandler = useCallback(() => setCurrentPage((p) => 1), []);
  const onPageLastHandler = useCallback(() => setCurrentPage(pages), [pages]);

  const isFirstDisabled = page === 1;
  const isLastDisabled = page === pages;

  return {
    rows,
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
    onPerPageChange: setPerPage,
  };
};
