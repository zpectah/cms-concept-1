import { ReactNode } from 'react';
import { Stack, Grid, Divider } from '@mui/material';
import { WithChildren } from '@common';
import { UI_SPACING } from '../../constants';
import { ActionBar } from '../Content';
import FormContent from './FormContent';

interface FormLayoutProps extends WithChildren {
  actions: ReactNode;
  sidebar?: ReactNode;
}

const FormLayout = ({ children, actions, sidebar }: FormLayoutProps) => (
  <Stack gap={UI_SPACING.layout}>
    <Grid container spacing={UI_SPACING.layout}>
      <Grid size={{ xs: 12, md: sidebar ? 8 : 12 }}>
        <FormContent>{children}</FormContent>
      </Grid>
      {sidebar && (
        <Grid size={{ xs: 12, md: 4 }}>
          <Divider sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }} />
          <Stack gap={1} sx={{ flexDirection: { xs: 'column-reverse', md: 'column' } }}>
            {sidebar}
          </Stack>
        </Grid>
      )}
    </Grid>
    <Divider />
    <ActionBar>{actions}</ActionBar>
  </Stack>
);

export default FormLayout;
