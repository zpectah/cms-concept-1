import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import { getConfig } from '../../config';

const Wrapper = styled('span')(({ theme }) => ({
  ...theme.typography.h4,
  fontWeight: 900,
  padding: 0,
  lineHeight: 0,
  letterSpacing: '-0.05rem',
  textDecoration: 'none',
  textTransform: 'uppercase',
  color: 'inherit',
  textShadow: `1px 1px 0 ${theme.palette.text.disabled}`,
}));

const WrapperLink = styled(Link)(({ theme }) => ({
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
  textShadow: `1px 1px 0 ${theme.palette.text.disabled}`,

  '&:hover': {
    opacity: 1,
  },
}));

interface CmsLogoProps {
  disableLink?: boolean;
}

const CmsLogo = ({ disableLink }: CmsLogoProps) => {
  const {
    routes,
    admin: { meta },
  } = getConfig();

  if (disableLink) return <Wrapper>{meta.title}</Wrapper>;

  return <WrapperLink to={routes.dashboard.path}>{meta.title}</WrapperLink>;
};

export default CmsLogo;
