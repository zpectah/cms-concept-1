import { ControlledFormField } from '../FormField';
import { Textarea } from '../input';
import { TextareaFieldProps } from './types';

const TextareaField = ({ fieldProps, isDisabled, isRequired, ...rest }: TextareaFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => (
      <Textarea
        fullWidth
        error={!!fieldState.error}
        disabled={isDisabled}
        required={isRequired}
        {...fieldProps}
        {...field}
      />
    )}
    {...rest}
  />
);

export default TextareaField;
