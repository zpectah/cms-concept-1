import { CardProps } from './types';
import Card from './Card';

type HiddenCardProps = CardProps & {
  visible?: boolean;
};

const HiddenCard = ({ children, visible, ...rest }: HiddenCardProps) => {
  if (!visible) return null;

  return <Card {...rest}>{children}</Card>;
};

export default HiddenCard;
