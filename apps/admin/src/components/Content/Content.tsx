import { Stack, StackProps } from '@mui/material';
import { WithChildren } from '@common';

interface ContentProps extends WithChildren {
  stackProps?: Partial<Omit<StackProps, 'children'>>;
}

const Content = ({ children, stackProps }: ContentProps) => (
  <Stack direction="column" gap={3} {...stackProps}>
    {children}
  </Stack>
);

export default Content;
