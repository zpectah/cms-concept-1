import { useTranslation } from 'react-i18next';
import { useLocation, useParams, Link } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import { getConfig } from '../../utils';
import { useEffect, useState } from 'react';

interface BreadcrumbsProps {
  disabled?: boolean;
}

const Breadcrumbs = ({ disabled }: BreadcrumbsProps) => {
  const { t } = useTranslation(['common', 'modules']);
  const { id } = useParams();
  const { pathname } = useLocation();
  const { admin } = getConfig();

  const [isPanels, setIsPanels] = useState(false);

  const attrs = pathname.split('/').filter(Boolean);
  const routeName = attrs[0];
  const subRouteName = attrs[1];

  const route = (admin.routes as Record<string, { path: string; panels?: Record<string, unknown> }>)[routeName];

  useEffect(() => {
    if (subRouteName) setIsPanels(!!route.panels);
  }, [route, subRouteName]);

  if (disabled || !routeName) return null;

  return (
    <MuiBreadcrumbs role="presentation" aria-label="breadcrumbs">
      <Typography variant="caption">{admin.meta.title}</Typography>
      {id ? (
        <Typography variant="caption" component={Link} to={`/${routeName}`} sx={{ color: 'inherit' }}>
          {t(`routes.${routeName}`)}
        </Typography>
      ) : (
        <Typography variant="caption">{t(`routes.${routeName}`)}</Typography>
      )}
      {id && <Typography variant="caption">#{id}</Typography>}
      {isPanels && <Typography variant="caption">{t(`modules:${routeName}.tabs.${subRouteName}.title`)}</Typography>}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
