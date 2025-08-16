import { ReactNode, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { styled, Box } from '@mui/material';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Container } from '../Container';
import LayoutBase from './LayoutBase';

const layoutVariantKeys = {
  default: 'default',
  minimal: 'minimal',
} as const;

interface AppLayoutProps {
  variant?: keyof typeof layoutVariantKeys;
  slot?: ReactNode;
}

const Wrapper = styled('main')({
  width: '100%',
  flex: 1,
  overflowY: 'auto',
  flexDirection: 'column',
});

const Content = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  gap: theme.spacing(4),
}));

const AppLayout = ({ variant = layoutVariantKeys.default, slot }: AppLayoutProps) => {
  const wrapperProps = {
    id: 'cms-layout',
    className: `variant--${variant}`,
  };

  return useMemo(() => {
    switch (variant) {
      case layoutVariantKeys.minimal:
        return (
          <>
            <LayoutBase {...wrapperProps}>
              <Wrapper>
                <Content>
                  <Box sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
                    <Outlet />
                  </Box>
                </Content>
              </Wrapper>
            </LayoutBase>
            {slot}
          </>
        );

      case layoutVariantKeys.default:
      default:
        return (
          <>
            <LayoutBase {...wrapperProps}>
              <Header />
              <Wrapper>
                <Container>
                  <Content>
                    <Outlet />
                    <Footer />
                  </Content>
                </Container>
              </Wrapper>
            </LayoutBase>
            {slot}
          </>
        );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, slot]);
};

export default AppLayout;
