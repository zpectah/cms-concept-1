import { ReactNode } from 'react';
import { Stack, Grid, Divider } from '@mui/material';
import { WithChildren } from '@common';
import FormContent from './FormContent';

interface FormLayoutProps extends WithChildren {
  actions: ReactNode;
  sidebar?: ReactNode;
}

const FormLayout = ({ children, actions, sidebar }: FormLayoutProps) => (
  <Stack gap={4}>
    <Grid container spacing={4}>
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
    <Stack direction="row" gap={1}>
      {actions}
    </Stack>
  </Stack>
);

export default FormLayout;
