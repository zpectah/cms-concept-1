import { Alert } from '@mui/material';
import { ToastsItem } from '../../../types';

interface ToastsListItemProps extends ToastsItem {
  onClose: (id: string) => void;
}

const ToastsListItem = ({ id, title, severity, onClose }: ToastsListItemProps) => (
  <Alert id={id} variant="filled" severity={severity} onClose={() => onClose(id)}>
    {title}
  </Alert>
);

export default ToastsListItem;
