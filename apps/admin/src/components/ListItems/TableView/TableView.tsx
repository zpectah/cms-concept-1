import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ItemBase } from '@common';
import { TableViewProps } from '../types';
import { checkboxStateKeys } from '../enums';

const TableView = <T extends ItemBase>({
  name,
  columns,
  onSelectAll,
  checkboxState,
  rows = [],
  pathPrefix,
  selected = [],
  onSelect,
  onDetail,
  onDelete,
  onDisable,
  isLoading,
}: TableViewProps<T>) => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table aria-label={`${name} list table`}>
        <TableHead>
          <TableRow>
            <TableCell width="100">
              <Checkbox
                onClick={onSelectAll}
                indeterminate={checkboxState === checkboxStateKeys.indeterminate}
                checked={checkboxState === checkboxStateKeys.checked}
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
                      <Typography variant="button" onClick={() => onDetail(row.id)} sx={{ cursor: 'pointer' }}>
                        {value}
                      </Typography>
                    ) : col?.renderValue ? (
                      col?.renderValue(row)
                    ) : (
                      value
                    )}
                  </TableCell>
                );
              })}

              <TableCell align="right">
                <button onClick={() => onDelete(row.id)}>delete</button>
                <button onClick={() => onDisable(row.id)}>disable</button>
                <button onClick={() => onDetail(row.id)}>detail</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
