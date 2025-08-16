import { styled, Box, BoxProps } from '@mui/material';

type LayoutBaseProps = BoxProps;

const Wrapper = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
}));

const LayoutBase = ({ children, ...rest }: LayoutBaseProps) => <Wrapper {...rest}>{children}</Wrapper>;

export default LayoutBase;
