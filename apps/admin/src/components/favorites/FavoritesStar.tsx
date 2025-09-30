import { useTranslation } from 'react-i18next';
import { styled, SvgIconProps } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { Model } from '@common';
import { useModelFavorites } from '../../hooks';
import { IconButtonPlus, IconButtonPlusProps } from '../Button';

const StarIconFilled = styled(StarIcon)(({ theme }) => ({
  color: theme.palette.warning.main,
}));
const StarIconEmpty = styled(StarOutlineIcon)(({ theme }) => ({
  color: theme.palette.grey['500'],
}));

interface FavoriteStarsProps {
  model: Model;
  id: number;
  iconButtonProps?: Partial<IconButtonPlusProps>;
  iconProps?: SvgIconProps;
}

const FavoritesStar = ({ model, id, iconButtonProps, iconProps }: FavoriteStarsProps) => {
  const { t } = useTranslation();
  const { toggleFavoriteItem, isItemFavorite } = useModelFavorites(model);

  const isFavorite = isItemFavorite(id);

  const finalIconProps = {
    ...iconProps,
  };

  return (
    <IconButtonPlus
      tooltip={t('button.favorite')}
      size="small"
      onClick={() => toggleFavoriteItem(id)}
      {...iconButtonProps}
    >
      {isFavorite ? <StarIconFilled {...finalIconProps} /> : <StarIconEmpty {...finalIconProps} />}
    </IconButtonPlus>
  );
};

export default FavoritesStar;
