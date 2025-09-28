import { styled, Stack } from '@mui/material';
import { getConfig } from '../../utils';
import { Container } from '../Container';

const Wrapper = styled('footer')(({ theme }) => ({
  width: '100%',
  minHeight: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.grey['500'],
  ...theme.typography.caption,
}));

const Footer = () => {
  const { project, meta, version } = getConfig();

  return (
    <Wrapper id="cms-footer">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="center" gap={0.5}>
          <span>{meta.title}</span>:<span>{project.name}</span>
          &nbsp;|&nbsp;
          <span>v{version}</span>
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default Footer;
