import { ReactNode, useMemo } from 'react';
import { Stack, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { UI_SPACING } from '../../constants';
import { Card } from '../Card';
import { FormContent } from '../Form';

interface LocalesTabsProps {
  render: (locale: string) => ReactNode;
  locales: string[];
  locale: string;
  onLocaleChange: (locale: string) => void;
}

const LocalesTabs = ({ render, locales, locale, onLocaleChange }: LocalesTabsProps) => {
  const renderContent = useMemo(() => {
    return locales?.map((loc) => (
      <Stack
        key={loc}
        direction="column"
        gap={UI_SPACING.form}
        sx={{
          mt: 1,
          display: locale === loc ? 'flex' : 'none',
        }}
      >
        {render(loc)}
      </Stack>
    ));
  }, [locale, locales, render]);

  if (locales?.length === 1) return renderContent;

  return (
    <Card sx={{ my: 1.5 }}>
      <Stack direction="row" gap={1}>
        <ToggleButtonGroup
          value={locale}
          exclusive
          onChange={(_, loc) => {
            onLocaleChange(loc);
          }}
          size="small"
          color="primary"
        >
          {locales?.map((loc) => (
            <ToggleButton key={loc} value={loc} sx={{ textTransform: 'uppercase' }}>
              &nbsp;{loc}&nbsp;
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
      <FormContent>{renderContent}</FormContent>
    </Card>
  );
};

export default LocalesTabs;
