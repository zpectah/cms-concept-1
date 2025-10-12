import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import { getConfig } from '../../utils';

const Wrapper = styled(Link)(({ theme }) => ({
  ...theme.typography.h4,
  fontWeight: 900,
  padding: 0,
  lineHeight: 0,
  letterSpacing: '-0.05rem',
  opacity: 0.9,
  cursor: 'pointer',
  textDecoration: 'none',
  textTransform: 'uppercase',
  color: 'inherit',

  '&:hover': {
    opacity: 1,
  },
}));

interface CmsLogoProps {
  disableLink?: boolean;
}

const CmsLogo = ({ disableLink }: CmsLogoProps) => {
  const {
    admin: { routes, meta },
  } = getConfig();

  return <Wrapper to={routes.dashboard.path}>{meta.title}</Wrapper>;
};

export default CmsLogo;
