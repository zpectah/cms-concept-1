import { ReactNode, useState } from 'react';
import { styled, Box, Stack, Typography } from '@mui/material';
import { WithChildren } from '@common';
import { Breadcrumbs } from '../../Breadcrumbs';
import { ViewLayoutContextProvider } from './ViewLayout.context';
import { viewLayoutTypeKeys } from './enums';
import { ConfirmDialog, ConfirmDialogBaseProps } from '../../Dialog';

type ViewLayoutType = keyof typeof viewLayoutTypeKeys;
type ViewLayoutTitle = string | ReactNode | undefined;
type ViewLayoutTitleAction = ReactNode | undefined;

interface ViewLayoutProps extends WithChildren {
  disableBreadcrumbs?: boolean;
  id?: string;
  title?: ViewLayoutTitle;
  titleAction?: ViewLayoutTitleAction;
  type?: ViewLayoutType;
}

const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

/* TODO */
const Main = styled(Box)(() => ({}));
const MainContent = styled(Box)(() => ({}));

const ViewLayout = ({
  children,
  disableBreadcrumbs,
  id,
  title,
  titleAction,
  type = viewLayoutTypeKeys.default,
}: ViewLayoutProps) => {
  const [layoutTitle, setLayoutTitle] = useState<ViewLayoutTitle>(title);
  const [layoutTitleAction, setLayoutTitleAction] = useState<ViewLayoutTitleAction>(titleAction);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogBaseProps | null>(null);

  const closeConfirmDialogHandler = () => setConfirmDialog(null);

  const layoutContext = {
    setTitle: setLayoutTitle,
    setTitleAction: setLayoutTitleAction,
    openConfirmDialog: setConfirmDialog,
  };

  return (
    <ViewLayoutContextProvider value={layoutContext}>
      <Wrapper id={id} className={`layout--${type}`}>
        <Stack gap={2}>
          <Breadcrumbs disabled={disableBreadcrumbs} />
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            {layoutTitle ? <Typography variant="h2">{layoutTitle}</Typography> : <div />}
            {layoutTitleAction && <Stack>{layoutTitleAction}</Stack>}
          </Stack>
        </Stack>
        <Main>
          <MainContent as="div">{children}</MainContent>
        </Main>
      </Wrapper>
      <ConfirmDialog
        open={!!confirmDialog}
        onClose={closeConfirmDialogHandler}
        title={confirmDialog?.title}
        content={confirmDialog?.content}
        onConfirm={() => confirmDialog?.onConfirm()}
      />
    </ViewLayoutContextProvider>
  );
};

export default ViewLayout;
