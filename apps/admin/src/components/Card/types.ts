import { ReactNode } from 'react';
import {
  CardProps as MuiCardProps,
  CardHeaderProps,
  CardContentProps,
  CardActionsProps,
  CardMediaProps,
} from '@mui/material';

export type CardProps = MuiCardProps & {
  cardHeaderProps?: Partial<CardHeaderProps>;
  cardContentProps?: Partial<CardContentProps>;
  cardMediaProps?: Partial<CardMediaProps>;
  cardActions?: ReactNode;
  cardActionsProps?: Partial<CardActionsProps>;
};
