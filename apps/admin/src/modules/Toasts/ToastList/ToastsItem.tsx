import { Alert } from '@mui/material';
import { ToastsItem as ToastsItemBaseProps } from '../../../types';

interface ToastsItemProps extends ToastsItemBaseProps {
  onClose: (id: string) => void;
}

const ToastsItem = ({ id, title, severity, onClose }: ToastsItemProps) => (
  <Alert id={id} variant="filled" severity={severity} onClose={() => onClose(id)}>
    {title}
  </Alert>
);

export default ToastsItem;
