import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ItemBase } from '@common';
import { useViewLayoutContext } from '../layout';
import { Search } from '../input';
import { Card } from '../Card';
import { ListItemsProps } from './types';
import { listItemsSortOrderKeys, listItemsViewKeys } from './enums';
import { useListItemsControl } from './useListItemsControl';
import { LIST_ITEMS_PER_PAGE_OPTIONS } from './constants';

const ListItems = <T extends ItemBase>({
  name,
  initialView = listItemsViewKeys.rows,
  isLoading, // TODO
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
  pathPrefix,
}: ListItemsProps<T>) => {
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
    onSelectAll,
    onDeselect,
    pagination,
  } = useListItemsControl({
    items,
    initialView,
    searchKeys,
    itemsPerPage,
    onRowSelect,
  });
  const { openConfirmDialog } = useViewLayoutContext();
  const navigate = useNavigate();

  const { pages, page, onPageNext, onPagePrev, onPageFirst, onPageLast, disabledButton, perPage, onPerPageChange } =
    pagination;

  const deselectedSelectedHandler = () => onDeselect();

  const rowDisableHandler = (id: number) => onRowDisable?.(id);

  const rowDetailHandler = (id: number) => {
    onRowDetail?.(id);
    navigate(`${pathPrefix}/${id}`);
  };

  const disableSelectedHandler = useCallback(() => onDisableSelected?.(selected), [onDisableSelected, selected]);

  const deleteSelectedHandler = useCallback(() => {
    openConfirmDialog({
      title: 'Opravdu chcete smazat tyto položky?', // TODO #i18n
      content: 'Tyto vybrané položky budou smazány', // TODO #i18n
      onConfirm: () => onDeleteSelected?.(selected),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDeleteSelected, selected]);

  const rowDeleteHandler = (id: number) => {
    openConfirmDialog({
      title: 'Opravdu chcete smazat tuto položku?', // TODO #i18n
      content: 'Tato položk abude natrvalo smazána', // TODO #i18n
      onConfirm: () => onRowDelete?.(id),
    });
  };

  return (
    <Stack gap={2}>
      <Card>
        <Stack>
          <div>
            <button onClick={onViewToggle}>toggle view: {view}</button>
          </div>
        </Stack>
        <Stack>
          <Search value={query} onChange={(event) => onQueryChange(event.target.value)} fullWidth />
        </Stack>
        <Stack>
          <ToggleButtonGroup value={sortBy} size="small">
            {orderKeys?.map((key, index) => (
              <ToggleButton key={index} value={key} onClick={() => onOrderBy(key)}>
                &nbsp;{String(key)}&nbsp;
                {key === sortBy && (
                  <>
                    {orderBy === listItemsSortOrderKeys.asc ? (
                      <ArrowUpwardIcon fontSize="inherit" />
                    ) : (
                      <ArrowDownwardIcon fontSize="inherit" />
                    )}
                  </>
                )}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>
        <div>
          Selected {selected.length} of {rawRows.length} &nbsp;{' '}
          <button onClick={deselectedSelectedHandler} disabled={selected.length === 0}>
            deselect all
          </button>
          <button onClick={deleteSelectedHandler} disabled={selected.length === 0}>
            delete selected
          </button>
          <button onClick={disableSelectedHandler} disabled={selected.length === 0}>
            disable selected
          </button>
        </div>
        <Stack>
          <div>
            <button onClick={onPageFirst} disabled={disabledButton.first}>
              first
            </button>
            <button onClick={onPagePrev} disabled={disabledButton.prev}>
              prev
            </button>
            &nbsp;
            <button onClick={onPageNext} disabled={disabledButton.next}>
              next
            </button>
            <button onClick={onPageLast} disabled={disabledButton.last}>
              last
            </button>
          </div>
          <Stack>
            Page {page} of {pages}
          </Stack>
          <div>
            <select value={perPage} onChange={(event) => onPerPageChange(Number(event.target.value))}>
              {LIST_ITEMS_PER_PAGE_OPTIONS.map((item) => (
                <option key={item} value={item} label={String(item)} />
              ))}
            </select>
          </div>
        </Stack>
      </Card>

      <div>
        {view === 'rows' ? (
          <div>
            <TableContainer component={Paper} variant="outlined">
              <Table aria-label={`${name} list table`}>
                <TableHead>
                  <TableRow>
                    <TableCell width="100">
                      <Checkbox
                        onClick={onSelectAll}
                        indeterminate={checkboxState === 'indeterminate'}
                        checked={checkboxState === 'checked'}
                      />
                    </TableCell>

                    {columns?.map((col) => (
                      <TableCell key={String(col.value)} variant="head" align="right">
                        {col.label}
                      </TableCell>
                    ))}

                    <TableCell align="right">&nbsp;</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Checkbox checked={selected.includes(row.id)} onClick={() => onSelect(row.id)} />
                      </TableCell>

                      {columns?.map((col) => {
                        const rawValue = row[col.value as keyof T];
                        const value = String(rawValue);

                        return (
                          <TableCell variant="body" key={String(col.value)} align="right">
                            {col.isTitle ? (
                              <Link
                                to={`${pathPrefix}/${row.id}`}
                                onClick={() => {
                                  onRowDetail?.(row.id);
                                }}
                              >
                                {value}
                              </Link>
                            ) : col?.renderValue ? (
                              col?.renderValue(row)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}

                      <TableCell align="right">
                        <button onClick={() => rowDeleteHandler(row.id)}>delete</button>
                        <button onClick={() => rowDisableHandler(row.id)}>disable</button>
                        <button onClick={() => rowDetailHandler(row.id)}>detail</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <div>
            {/* TODO: prepare tiles view ... */}
            {rows.map((item) => {
              return (
                <div key={item.id}>
                  tile item
                  <br />
                  {item.id} / {item.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Stack>
  );
};

export default ListItems;
