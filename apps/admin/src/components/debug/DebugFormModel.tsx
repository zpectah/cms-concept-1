import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTheme, Stack } from '@mui/material';
import { JsonViewer } from '../JsonViewer';
import { Card } from '../Card';

interface DebugFormModelProps {
  name: string;
}

const DebugFormModel = ({ name }: DebugFormModelProps) => {
  const form = useFormContext();
  const { palette } = useTheme();

  const cardSxProps = useMemo(() => {
    const propsBase = { marginTop: 2 };

    if (Object.keys(form.formState.errors).length > 0) {
      return {
        ...propsBase,
        borderColor: palette.error.main,
      };
    }

    return propsBase;
  }, [form.formState.errors]);

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      console.warn(name, form.formState.errors);
    }
  }, [form.formState.errors, name]);

  return (
    <Card sx={{ ...cardSxProps }}>
      <Stack direction="column" gap={4}>
        {Object.keys(form.formState.errors).length > 0 && <JsonViewer data={form.formState.errors} label={'Errors'} />}
        <JsonViewer data={form.watch()} label={name} />
      </Stack>
    </Card>
  );
};

export default DebugFormModel;
