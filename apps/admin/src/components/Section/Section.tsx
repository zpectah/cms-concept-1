import { ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';
import { WithChildren } from '@common';
import { Card, CardProps } from '../Card';

interface SectionProps extends WithChildren {
  title?: ReactNode;
  cardContent?: boolean;
  cardProps?: Partial<CardProps>;
}

const Section = ({ children, title, cardContent, cardProps }: SectionProps) => (
  <Stack component="section" gap={2}>
    {title && <Typography variant="h3">{title}</Typography>}
    {cardContent ? <Card {...cardProps}>{children}</Card> : children}
  </Stack>
);

export default Section;
