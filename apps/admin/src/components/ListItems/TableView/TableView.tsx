import { useTranslation } from 'react-i18next';
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
  Stack,
  SvgIconProps,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ItemBase } from '@common';
import { IconButtonPlus, IconButtonPlusProps } from '../../Button';
import { FavoritesStar } from '../../favorites';
import { TableViewProps } from '../types';
import { checkboxStateKeys } from '../enums';

const TableView = <T extends ItemBase>({
  pathPrefix,
  isLoading,
  name,
  columns,
  onSelectAll,
  checkboxState,
  rows = [],
  selected = [],
  onSelect,
  onDetail,
  onDelete,
  onDisable,
  model,
  disableFavorites,
  renderRowActions,
  modelActions,
  disableToggleAction,
}: TableViewProps<T>) => {
  const { t } = useTranslation(['common', 'form']);

  const getActions = (id: number, active?: boolean) => {
    const iconProps: SvgIconProps = {
      fontSize: 'inherit',
    };
    const buttonCommonProps: Partial<IconButtonPlusProps> = {
      size: 'small',
    };

    return [
      {
        ...buttonCommonProps,
        onClick: () => onDelete(id),
        tooltip: t('button.delete'),
        children: <DeleteOutlineIcon {...iconProps} />,
        disabled: !modelActions.delete,
        hidden: false,
      },
      {
        ...buttonCommonProps,
        onClick: () => onDisable(id),
        tooltip: active ? t('button.disable') : t('button.active'),
        children: active ? <VisibilityIcon fontSize="inherit" /> : <VisibilityOffIcon fontSize="inherit" />,
        disabled: !modelActions.modify,
        hidden: disableToggleAction ?? false,
      },
      {
        ...buttonCommonProps,
        onClick: () => onDetail(id),
        tooltip: t('button.detail'),
        children: <ArrowOutwardIcon {...iconProps} />,
        disabled: !modelActions.view,
        hidden: false,
      },
    ] as (IconButtonPlusProps & { hidden: boolean })[];
  };

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
              <TableCell
                key={String(col.value)}
                variant="head"
                align={col.isTitle ? 'left' : 'right'}
                width={col.isTitle ? '100%' : 'auto'}
              >
                {col.label ? col.label : t(`form:label.${String(col.value)}`)}
              </TableCell>
            ))}

            <TableCell align="right">&nbsp;</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <Checkbox checked={selected.includes(row.id)} onClick={() => onSelect(row.id)} />
              </TableCell>

              {columns?.map((col) => {
                const rawValue = row[col.value as keyof T];
                const value = String(rawValue);

                return (
                  <TableCell variant="body" key={String(col.value)} align={col.isTitle ? 'left' : 'right'}>
                    {col.isTitle ? (
                      <Stack direction="row" gap={1.5} alignItems="center" justifyContent="start">
                        {!disableFavorites && <FavoritesStar model={model} id={row.id} />}
                        <Typography variant="button" onClick={() => onDetail(row.id)} sx={{ cursor: 'pointer' }}>
                          {value}
                        </Typography>
                      </Stack>
                    ) : col?.renderValue ? (
                      col?.renderValue(row)
                    ) : (
                      value
                    )}
                  </TableCell>
                );
              })}

              <TableCell align="right">
                <Stack direction="row" gap={1} sx={{ display: 'inline-flex' }}>
                  {renderRowActions?.(row)}
                  {getActions(row.id, row.active).map(
                    ({ hidden, ...button }, index) => !hidden && <IconButtonPlus key={index} {...button} />
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
