import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Textarea, TextareaProps } from '../input';

interface DebugFormModelProps {
  name: string;
  textareaProps?: Partial<Omit<TextareaProps, 'ref'>>;
}

const DebugFormModel = ({ name, textareaProps }: DebugFormModelProps) => {
  const form = useFormContext();

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      console.warn(name, form.formState.errors);
    }
  }, [form.formState.errors, name]);

  return <Textarea value={JSON.stringify(form.watch(), null, 2)} readOnly rows={20} {...textareaProps} />;
};

export default DebugFormModel;
