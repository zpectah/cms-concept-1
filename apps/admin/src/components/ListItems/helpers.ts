import { ItemBase } from '@common';
import { ListItemsSortOrder } from './types';
import { listItemsSortOrderKeys } from './enums';

export function searchItems<T extends ItemBase>(items: T[], query: string, keys: (keyof T)[], minLength = 3): T[] {
  const q = query.toLowerCase().trim();

  if (!q || q.length < minLength) return items;

  return items.filter((item) =>
    keys.some((key) => {
      const value = item[key];

      if (value == null) return false;

      return String(value).toLowerCase().includes(q);
    })
  );
}

export function sortItems<T extends ItemBase>(key: keyof T, order: ListItemsSortOrder = listItemsSortOrderKeys.desc) {
  return (a: T, b: T) => {
    const valA = a[key];
    const valB = b[key];

    if (valA == null && valB == null) return 0;
    if (valA == null) return 1;
    if (valB == null) return -1;

    if (typeof valA === 'number' && typeof valB === 'number') {
      return order === listItemsSortOrderKeys.asc ? valA - valB : valB - valA;
    }

    if (typeof valA === 'string' && /^\d{4}-\d{2}-\d{2}/.test(valA)) {
      const dateA = new Date(valA).getTime();
      const dateB = new Date(valB as string).getTime();
      return order === listItemsSortOrderKeys.asc ? dateA - dateB : dateB - dateA;
    }

    return order === listItemsSortOrderKeys.asc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  };
}
