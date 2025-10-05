import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Blacklist, BlacklistItem } from '@common';
import { IconButtonPlus, Search, Input, Email } from '../../../components';
import { muiCommonColorVariantKeys } from '../../../enums';

interface BlacklistTableProps {
  blacklistItems: Blacklist;

  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onCreate: (item: BlacklistItem) => void;
}

const DEFAULT_ITEM = { id: 0, email: '', ipaddress: '', created: '', active: true };

const BlacklistTable = ({ blacklistItems, onDelete, onToggle, onCreate }: BlacklistTableProps) => {
  const [newItem, setNewItem] = useState<BlacklistItem>(Object.assign(DEFAULT_ITEM));

  const { t } = useTranslation(['common']);

  const newItemChangeHandler = (key: keyof BlacklistItem, value: BlacklistItem[keyof BlacklistItem]) => {
    const master = Object.assign({ ...newItem });

    master[key] = value;

    setNewItem(master);
  };

  const newItemSubmitHandler = () => {
    const master = Object.assign(newItem);

    onCreate(master);

    setNewItem(Object.assign(DEFAULT_ITEM));
  };

  return (
    <Stack gap={2}>
      <div>
        <Search fullWidth />
      </div>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="auto">E-mail</TableCell>
              <TableCell width="auto">IP Adresa</TableCell>
              <TableCell width="20%">Datum přidání</TableCell>
              <TableCell width="20%" align="right">
                Akce
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blacklistItems.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell component="th">{row.ipaddress}</TableCell>
                <TableCell>{row.created}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" gap={1} sx={{ display: 'inline-flex' }}>
                    <IconButtonPlus
                      size="small"
                      color={muiCommonColorVariantKeys.error}
                      onClick={() => onDelete(row.id)}
                      tooltip={t('button.delete')}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButtonPlus>
                    <IconButtonPlus
                      size="small"
                      color={muiCommonColorVariantKeys.warning}
                      onClick={() => onToggle(row.id)}
                      tooltip={t('button.disable')}
                    >
                      {row.active ? <VisibilityOffIcon fontSize="inherit" /> : <VisibilityIcon fontSize="inherit" />}
                    </IconButtonPlus>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" gap={1.5} alignItems="center">
        <Email
          fullWidth
          size="small"
          placeholder="E-mail"
          value={newItem.email}
          onChange={(event) => newItemChangeHandler('email', event.target.value)}
        />
        <span>or</span>
        <Input
          fullWidth
          size="small"
          placeholder="IP Adress"
          value={newItem.ipaddress}
          onChange={(event) => newItemChangeHandler('ipaddress', event.target.value)}
        />
        <Stack direction="row" gap={1} sx={{ display: 'inline-flex' }}>
          <Button variant="contained" color="inherit" onClick={newItemSubmitHandler}>
            Přidat
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BlacklistTable;
