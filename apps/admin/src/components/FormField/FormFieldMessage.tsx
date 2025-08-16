import { styled } from '@mui/material';
import { FormFieldMessageProps } from './types';
import { formFieldMessageSeverityKeys } from './enums';

const FieldMessage = styled('div')(({ theme }) => ({
  ...theme.typography.caption,
}));

const FieldSuccessMessage = styled(FieldMessage)(({ theme }) => ({
  color: theme.palette.success.main,
}));

const FieldErrorMessage = styled(FieldMessage)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const FormFieldMessage = ({ children, severity = formFieldMessageSeverityKeys.default }: FormFieldMessageProps) => {
  switch (severity) {
    case formFieldMessageSeverityKeys.success:
      return <FieldSuccessMessage children={children} />;

    case formFieldMessageSeverityKeys.error:
      return <FieldErrorMessage children={children} />;

    case formFieldMessageSeverityKeys.default:
    default:
      return <FieldMessage children={children} />;
  }
};

export default FormFieldMessage;
