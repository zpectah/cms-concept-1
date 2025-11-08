import { WithChildren } from '@common';
import { Stack, StackProps } from '@mui/material';
import { UI_SPACING } from '../../constants';

interface FormContentProps extends WithChildren {
  stackProps?: Partial<StackProps>;
}

const FormContent = ({ children, stackProps }: FormContentProps) => (
  <Stack direction="column" gap={UI_SPACING.form} {...stackProps}>
    {children}
  </Stack>
);

export default FormContent;
