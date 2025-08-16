import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import { getConfig } from '../../utils';

interface BreadcrumbsProps {
  disabled?: boolean;
}

const Breadcrumbs = ({ disabled }: BreadcrumbsProps) => {
  const { t } = useTranslation();
  const { id, panel } = useParams();
  const { pathname } = useLocation();
  const { admin } = getConfig();

  const attrs = pathname.split('/').filter(Boolean);
  const routeName = attrs[0];

  if (disabled || !routeName) return null;

  return (
    <MuiBreadcrumbs role="presentation" aria-label="breadcrumbs">
      <Typography variant="caption">{admin.meta.title}</Typography>
      <Typography variant="caption">{t(`routes.${routeName}`)}</Typography>
      {id && <Typography variant="caption">#{id}</Typography>}
      {panel && <Typography variant="caption">{t(`panels.${panel}`)}</Typography>}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
