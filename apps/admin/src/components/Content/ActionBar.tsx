import { Stack, StackProps } from '@mui/material';
import { WithChildren } from '@common';
import { UI_SPACING } from '../../constants';

interface ActionBarProps extends WithChildren {
  stackProps?: Partial<StackProps>;
}

const ActionBar = ({ children, stackProps }: ActionBarProps) => (
  <Stack direction="row" gap={UI_SPACING.action} {...stackProps}>
    {children}
  </Stack>
);

export default ActionBar;
