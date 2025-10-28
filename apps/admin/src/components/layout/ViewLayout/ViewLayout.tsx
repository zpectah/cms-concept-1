import { ReactNode, useState } from 'react';
import { styled, Box, Stack, Typography, Skeleton } from '@mui/material';
import { WithChildren } from '@common';
import { Breadcrumbs } from '../../Breadcrumbs';
import { ViewLayoutContextProvider } from './ViewLayout.context';
import { viewLayoutTypeKeys } from './enums';

type ViewLayoutType = keyof typeof viewLayoutTypeKeys;
type ViewLayoutTitle = string | ReactNode | undefined;
type ViewLayoutTitleAction = ReactNode | undefined;

interface ViewLayoutProps extends WithChildren {
  disableBreadcrumbs?: boolean;
  id?: string;
  title?: ViewLayoutTitle;
  titleAction?: ViewLayoutTitleAction;
  type?: ViewLayoutType;
  tabsNavigation?: ReactNode;
}

const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

/* TODO */
const Main = styled(Stack)(() => ({}));
const MainContent = styled(Box)(() => ({}));

const ViewLayout = ({
  children,
  disableBreadcrumbs,
  id,
  title,
  titleAction,
  type = viewLayoutTypeKeys.default,
  tabsNavigation,
}: ViewLayoutProps) => {
  const [layoutTitle, setLayoutTitle] = useState<ViewLayoutTitle>(title);
  const [layoutTitleAction, setLayoutTitleAction] = useState<ViewLayoutTitleAction>(titleAction);

  const layoutContext = {
    setTitle: setLayoutTitle,
    setTitleAction: setLayoutTitleAction,
  };

  return (
    <ViewLayoutContextProvider value={layoutContext}>
      <Wrapper id={id} className={`layout--${type}`}>
        <Stack gap={2}>
          <Breadcrumbs disabled={disableBreadcrumbs} />
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            {layoutTitle ? (
              <Typography variant="h2">{layoutTitle}</Typography>
            ) : (
              <Skeleton variant="rectangular" width={210} height={30} />
            )}
            {layoutTitleAction && <Stack>{layoutTitleAction}</Stack>}
          </Stack>
        </Stack>
        <Main gap={4}>
          {tabsNavigation && tabsNavigation}
          <MainContent as="div">{children}</MainContent>
        </Main>
      </Wrapper>
    </ViewLayoutContextProvider>
  );
};

export default ViewLayout;
