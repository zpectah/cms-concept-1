import { styled, Container, Stack } from '@mui/material';
import { CmsLogo } from '../CmsLogo';
import { UserMenu } from '../UserMenu';
import { MainMenu } from '../MainMenu';

const Wrapper = styled('header')(({ theme }) => ({
  width: '100%',
  borderBottom: `solid 1px ${theme.palette.divider}`,
}));

const WrapperInner = styled('div')(({ theme }) => ({
  width: '100%',
  height: '59px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Block = styled('div')({
  width: `calc(100 / 3)`,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
});

const PrimaryBlock = styled(Block)({
  justifyContent: 'flex-start',
});
const SecondaryBlock = styled(Block)({
  justifyContent: 'flex-end',
});
const TertiaryBlock = styled(Block)({
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: 0,
});

const Header = () => (
  <Wrapper id="cms-header">
    <Container>
      <WrapperInner>
        <PrimaryBlock>
          <MainMenu />
        </PrimaryBlock>
        <TertiaryBlock>
          <CmsLogo />
        </TertiaryBlock>
        <SecondaryBlock>
          <Stack direction="row" gap={1.5}>
            <UserMenu />
          </Stack>
        </SecondaryBlock>
      </WrapperInner>
    </Container>
  </Wrapper>
);

export default Header;
