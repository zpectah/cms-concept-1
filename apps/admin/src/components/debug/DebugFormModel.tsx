import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { JsonViewer } from '../JsonViewer';
import { Card } from '../Card';

interface DebugFormModelProps {
  name: string;
}

const DebugFormModel = ({ name }: DebugFormModelProps) => {
  const form = useFormContext();

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      console.warn(name, form.formState.errors);
    }
  }, [form.formState.errors, name]);

  return (
    <Card sx={{ marginTop: 2 }}>
      <JsonViewer data={form.watch()} label={name} />
    </Card>
  );
};

export default DebugFormModel;
