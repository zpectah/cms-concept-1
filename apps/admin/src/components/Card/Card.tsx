import { Card as MuiCard, CardHeader, CardContent, CardActions, CardMedia } from '@mui/material';
import { CardProps } from './types';

const Card = ({
  children,
  cardHeaderProps,
  cardContentProps,
  cardMediaProps,
  cardActions,
  cardActionsProps,
  title,
  ...rest
}: CardProps) => {
  return (
    <MuiCard {...rest}>
      {(cardHeaderProps || title) && <CardHeader title={title} {...cardHeaderProps} />}
      {cardMediaProps && <CardMedia {...cardMediaProps} />}
      {(children || cardContentProps) && <CardContent {...cardContentProps}>{children}</CardContent>}
      {cardActions && <CardActions {...cardActionsProps}>{cardActions}</CardActions>}
    </MuiCard>
  );
};

export default Card;
