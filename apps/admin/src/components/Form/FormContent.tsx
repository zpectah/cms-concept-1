import { WithChildren } from '@common';
import { Stack, StackProps } from '@mui/material';

interface FormContentProps extends WithChildren {
  stackProps?: Partial<StackProps>;
}

const FormContent = ({ children, stackProps }: FormContentProps) => (
  <Stack gap={1} {...stackProps}>
    {children}
  </Stack>
);

export default FormContent;
