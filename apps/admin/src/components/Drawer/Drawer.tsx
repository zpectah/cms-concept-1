import { styled, Drawer as MuiDrawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { UI_HEADER_HEIGHT } from '../../constants';
import { DrawerProps } from './types';

const DrawerLayout = styled('div')(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  width: '100%',
  minHeight: UI_HEADER_HEIGHT,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: 0,
  borderBottom: `solid 1px ${theme.palette.divider}`,
  ...theme.typography.h4,
}));

const DrawerContent = styled('div')(({ theme }) => ({
  width: '100%',
  flex: 1,
  overflowY: 'auto',
}));

const DrawerContentInner = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));

const DrawerFooter = styled('div')(({ theme }) => ({
  width: '100%',
  minHeight: UI_HEADER_HEIGHT,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: 0,
  borderTop: `solid 1px ${theme.palette.divider}`,
}));

const Drawer = ({ children, header, footer, disableCloseButton, onClose, content, ...rest }: DrawerProps) => {
  return (
    <MuiDrawer onClose={onClose} {...rest}>
      <DrawerLayout>
        {!disableCloseButton && (
          <IconButton
            onClick={onClose}
            sx={({ spacing }) => ({ position: 'absolute', top: spacing(1), right: spacing(1), zIndex: 9999 })}
          >
            <CloseIcon />
          </IconButton>
        )}
        {header && <DrawerHeader>{header}</DrawerHeader>}
        <DrawerContent>
          {content && content}
          {children && <DrawerContentInner>{children}</DrawerContentInner>}
        </DrawerContent>
        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerLayout>
    </MuiDrawer>
  );
};

export default Drawer;
