import { useTranslation } from 'react-i18next';
import {
  Button,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { getConfig } from '../../../utils';

interface LocalesTableProps {
  onLocaleInstall: (locale: string) => void;
  onLocaleToggle: (locale: string) => void;
  onLocaleDefault: (locale: string) => void;
  isInstalling: string | null;
  isUpdating: string | null;
  isLocaleInstalled: (locale: string) => boolean | undefined;
  isLocaleActive: (locale: string) => boolean | undefined;
  isLocaleDefault: (locale: string) => boolean | undefined;
}

const LocalesTable = ({
  onLocaleInstall,
  onLocaleToggle,
  onLocaleDefault,
  isInstalling,
  isUpdating,
  isLocaleInstalled,
  isLocaleActive,
  isLocaleDefault,
}: LocalesTableProps) => {
  const { t } = useTranslation(['common', 'modules']);

  const { locales } = getConfig();

  const availableLocales = Object.keys(locales);

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="auto"></TableCell>
            <TableCell width="20%">{t('modules:settings.tabs.language.section.table.installed')}</TableCell>
            <TableCell width="20%">{t('modules:settings.tabs.language.section.table.active')}</TableCell>
            <TableCell width="20%">{t('modules:settings.tabs.language.section.table.default')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {availableLocales.map((locale) => {
            const isInstalled = isLocaleInstalled(locale);
            const isActive = isLocaleActive(locale);

            return (
              <TableRow key={locale} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Stack direction="row" gap={1.5} alignItems="center">
                    <Typography variant="button">
                      {(locales as Record<string, { label: string }>)[locale].label}
                    </Typography>
                    <Typography variant="caption">{locale}</Typography>
                    {(isUpdating === locale || isInstalling === locale) && <CircularProgress size={15} />}
                  </Stack>
                </TableCell>
                <TableCell>
                  {isInstalled ? (
                    <CheckIcon fontSize="small" color="success" />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => onLocaleInstall(locale)}
                      loading={isInstalling === locale}
                    >
                      {t('modules:settings.tabs.language.section.button.install')}
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Radio
                    checked={isLocaleActive(locale)}
                    onClick={() => onLocaleToggle(locale)}
                    size="small"
                    disabled={!isInstalled}
                  />
                </TableCell>
                <TableCell>
                  <Radio
                    checked={isLocaleDefault(locale)}
                    onClick={() => onLocaleDefault(locale)}
                    size="small"
                    disabled={!isInstalled || !isActive}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LocalesTable;
