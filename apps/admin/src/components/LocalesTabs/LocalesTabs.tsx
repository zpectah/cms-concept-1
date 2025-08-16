import { ReactNode, useMemo } from 'react';
import { Stack, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Card } from '../Card';

interface LocalesTabsProps {
  render: (locale: string) => ReactNode;
  locales: string[];
  locale: string;
  onLocaleChange: (locale: string) => void;
}

const LocalesTabs = ({ render, locales, locale, onLocaleChange }: LocalesTabsProps) => {
  const renderContent = useMemo(() => {
    return locales.map((loc) => (
      <Box
        key={loc}
        sx={{
          mt: 2,
          display: locale === loc ? 'block' : 'none',
        }}
      >
        {render(loc)}
      </Box>
    ));
  }, [locale, locales, render]);

  if (locales.length === 1) return renderContent;

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
          {locales.map((loc) => (
            <ToggleButton key={loc} value={loc} sx={{ textTransform: 'uppercase' }}>
              &nbsp;{loc}&nbsp;
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
      {renderContent}
    </Card>
  );
};

export default LocalesTabs;
