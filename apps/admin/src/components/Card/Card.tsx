import { Card as MuiCard, CardHeader, CardContent, CardActions, CardMedia } from '@mui/material';
import { CardProps } from './types';

const Card = ({
  children,
  cardHeaderProps,
  cardContentProps,
  cardMediaProps,
  cardActions,
  cardActionsProps,
  ...rest
}: CardProps) => {
  return (
    <MuiCard {...rest}>
      {cardHeaderProps && <CardHeader {...cardHeaderProps} />}
      {cardMediaProps && <CardMedia {...cardMediaProps} />}
      <CardContent {...cardContentProps}>{children}</CardContent>
      {cardActions && <CardActions {...cardActionsProps}>{cardActions}</CardActions>}
    </MuiCard>
  );
};

export default Card;
