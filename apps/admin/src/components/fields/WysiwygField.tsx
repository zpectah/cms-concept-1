import { ControlledFormField } from '../FormField';
import { Wysiwyg } from '../input';
import { WysiwygFieldProps } from './types';

const WysiwygField = ({ fieldProps, isDisabled, isRequired, readOnly, ...rest }: WysiwygFieldProps) => (
  <ControlledFormField
    render={({ field, fieldState }) => (
      <Wysiwyg
        isError={!!fieldState.error}
        disabled={isDisabled}
        required={isRequired}
        readOnly={readOnly}
        {...fieldProps}
        {...field}
      />
    )}
    {...rest}
  />
);

export default WysiwygField;
