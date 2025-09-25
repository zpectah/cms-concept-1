import { Stack, StackProps } from '@mui/material';
import { WithChildren } from '@common';
import { UI_SPACING } from '../../constants';

interface ContentProps extends WithChildren {
  stackProps?: Partial<Omit<StackProps, 'children'>>;
}

const Content = ({ children, stackProps }: ContentProps) => (
  <Stack direction="column" gap={UI_SPACING.layout} {...stackProps}>
    {children}
  </Stack>
);

export default Content;
