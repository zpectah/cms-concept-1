import { styled, Tooltip } from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';
import RemoveIcon from '@mui/icons-material/Remove';
import { tagsColorKeys, tagColor, TagsColor } from '@common';
import { getOptionValue } from '../../helpers';

interface ValueColorProps {
  value: TagsColor;
}

const StyledIcon = styled(LabelIcon, {
  shouldForwardProp: (propName) => propName !== 'colorValue',
})<{ readonly colorValue: TagsColor }>(({ theme, colorValue }) => {
  switch (colorValue) {
    case tagsColorKeys.red:
      return {
        color: tagColor.red,
      };

    case tagsColorKeys.orange:
      return {
        color: tagColor.orange,
      };

    case tagsColorKeys.yellow:
      return {
        color: tagColor.yellow,
      };

    case tagsColorKeys.green:
      return {
        color: tagColor.green,
      };

    case tagsColorKeys.blue:
      return {
        color: tagColor.blue,
      };

    case tagsColorKeys.pink:
      return {
        color: tagColor.pink,
      };

    case tagsColorKeys.purple:
      return {
        color: tagColor.purple,
      };

    case tagsColorKeys.brown:
      return {
        color: tagColor.brown,
      };

    case tagsColorKeys.black:
      return {
        color: tagColor.black,
      };

    case tagsColorKeys.white:
      return {
        color: tagColor.white,
      };

    case tagsColorKeys.none:
    default:
      return {};
  }
});

const ValueColor = ({ value }: ValueColorProps) => (
  <Tooltip title={getOptionValue(value, 'color')}>
    {value === 'none' ? (
      <RemoveIcon fontSize="small" sx={({ palette }) => ({ color: palette.grey['500'] })} />
    ) : (
      <StyledIcon colorValue={value} fontSize="small" />
    )}
  </Tooltip>
);

export default ValueColor;
