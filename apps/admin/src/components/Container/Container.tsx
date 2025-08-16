import { Container as MuiContainer, ContainerProps as MuiContainerProps } from '@mui/material';

type ContainerProps = MuiContainerProps;

const CONTAINER_MAX_WIDTH = 'lg';

const Container = ({ children, ...rest }: ContainerProps) => (
  <MuiContainer maxWidth={CONTAINER_MAX_WIDTH} {...rest}>
    {children}
  </MuiContainer>
);

export default Container;
