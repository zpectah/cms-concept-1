import { ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';
import { WithChildren } from '@common';

interface SectionProps extends WithChildren {
  title?: ReactNode;
}

const Section = ({ children, title }: SectionProps) => (
  <Stack component="section" gap={2}>
    {title && <Typography variant="h3">{title}</Typography>}
    {children}
  </Stack>
);

export default Section;
