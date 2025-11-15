import { styled, Box, Typography } from '@mui/material';
import { getEnvironmentVariables } from '../../helpers';

const ImageContainer = styled(Box)(() => ({
  display: 'inline-flex',
  position: 'relative',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ImageElement = styled('img')(() => ({
  maxWidth: '100%',
  height: 'auto',
  position: 'relative',
  top: 0,
  left: 0,
}));

interface ImageProps {
  src?: string;
  alt?: string;
  type?: 'local' | 'local-avatar' | 'external';
  size?: number;
}

const Image = ({ src, alt, type, size }: ImageProps) => {
  const { uploadsSource } = getEnvironmentVariables();

  const pathBase =
    type === 'local' ? `${uploadsSource}/image/` : type === 'local-avatar' ? `${uploadsSource}/avatar-user/` : '';
  const fullPath = `${pathBase}${src}`;

  return (
    <ImageContainer
      sx={({ palette }) => ({
        width: size ? `${size}px` : 'initial',
        height: size ? `${size}px` : 'initial',
        border: type === 'local-avatar' ? `1px solid ${palette.text.secondary}` : `2px dashed ${palette.divider}`,
        borderRadius: type === 'local-avatar' ? '100%' : 'initial',
      })}
    >
      {src ? (
        <ImageElement src={fullPath} alt={alt} />
      ) : (
        <Typography variant="caption" color="textDisabled">
          No image selected
        </Typography>
      )}
    </ImageContainer>
  );
};

export default Image;
