import { StackProps } from '@mui/material';
import { sectionSpacingKeys } from './enums';
import { WithChildren } from '@common';
import { ReactNode } from 'react';
import { CardProps } from '../Card';

export type SectionContentSpacing = keyof typeof sectionSpacingKeys;

export interface SectionProps extends WithChildren {
  title?: ReactNode;
  cardContent?: boolean;
  cardProps?: Partial<CardProps>;
  formSpacing?: boolean;
  contentSpacing?: SectionContentSpacing;
  stackProps?: Partial<StackProps>;
}
