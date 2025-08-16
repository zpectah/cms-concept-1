import { Box, Stack } from '@mui/material';
import { Label } from '../Label';
import { FormFieldBaseProps } from './types';
import FormFieldMessage from './FormFieldMessage';

const FormFieldBase = ({
  children,
  name,
  label,
  isRequired,
  helperMessages = [],
  successMessages = [],
  errorMessages = [],
  outerBoxProps,
  innerBoxProps,
}: FormFieldBaseProps) => (
  <Box {...outerBoxProps}>
    {label && (
      <Label htmlFor={name} isRequired={isRequired}>
        {label}
      </Label>
    )}
    <Stack direction="column" gap={1}>
      <Box {...innerBoxProps}>{children}</Box>
      <Stack direction="column" gap={0.5}>
        {errorMessages?.map((text, i) => (
          <FormFieldMessage key={i} severity="error">
            {text}
          </FormFieldMessage>
        ))}
        {successMessages?.map((text, i) => (
          <FormFieldMessage key={i} severity="success">
            {text}
          </FormFieldMessage>
        ))}
        {helperMessages?.map((text, i) => (
          <FormFieldMessage key={i}>{text}</FormFieldMessage>
        ))}
      </Stack>
    </Stack>
  </Box>
);

export default FormFieldBase;
