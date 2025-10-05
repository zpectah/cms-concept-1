import { Box, Stack } from '@mui/material';
import { Label } from '../Label';
import { FormFieldBaseProps } from './types';
import FormFieldMessage from './FormFieldMessage';

const FormFieldBase = ({
  children,
  name,
  label,
  isRequired,
  isDisabled,
  helperMessages = [],
  successMessages = [],
  errorMessages = [],
  outerBoxProps,
  innerBoxProps,
}: FormFieldBaseProps) => {
  const isContainer = errorMessages?.length > 0 || successMessages?.length > 0 || helperMessages?.length > 0;

  return (
    <Box {...outerBoxProps}>
      {label && (
        <Label htmlFor={name} isRequired={isRequired}>
          {label}
        </Label>
      )}
      <Stack direction="column" gap={1}>
        <Box {...innerBoxProps}>{children}</Box>
        {isContainer && (
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
        )}
      </Stack>
    </Box>
  );
};

export default FormFieldBase;
