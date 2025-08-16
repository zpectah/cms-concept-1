import { styled } from '@mui/material';
import { useAppStore } from '../../../store';
import ToastsItem from './ToastsItem';

const ToastsWrapper = styled('div')(() => ({
  width: '100%',
  height: 0,
  overflow: 'visible',
  position: 'fixed',
  bottom: 0,
  left: 0,
  zIndex: 9999,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'center',
}));

const ToastsWrapperList = styled('div')(({ theme }) => ({
  width: '350px',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),

  '& > :last-of-type': {
    marginBottom: theme.spacing(1),
  },
}));

const ToastList = () => {
  const { toasts, removeToast } = useAppStore();

  return (
    <ToastsWrapper>
      <ToastsWrapperList>
        {toasts.map((toast) => (
          <ToastsItem key={toast.id} onClose={removeToast} {...toast} />
        ))}
      </ToastsWrapperList>
    </ToastsWrapper>
  );
};

export default ToastList;
