import { useState } from 'react';
import { Button, Stack, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Input } from '../input';
import { BasePickerProps } from './types';

const BasePicker = ({ value, onChange, renderValue }: BasePickerProps) => {
  const [tempValue, setTempValue] = useState('');

  const addHandler = () => {
    const newState = [...value];

    newState.push(tempValue);

    onChange(newState);
    setTempValue('');
  };

  const removeHandler = (index: number) => {
    const newState = [...value];

    newState.splice(index, 1);

    onChange(newState);
  };

  return (
    <Stack gap={1.5}>
      <Stack direction="row" gap={1}>
        {value.map((item, index) =>
          renderValue ? (
            renderValue(item, index)
          ) : (
            <Chip key={index} label={item} onDelete={() => removeHandler(index)} />
          )
        )}
      </Stack>
      <Stack direction="row" gap={1}>
        <Input fullWidth value={tempValue} onChange={(event) => setTempValue(event.target.value)} />
        <Button onClick={addHandler} variant="outlined" color="success" disabled={!(tempValue.length >= 3)}>
          <AddIcon />
        </Button>
      </Stack>
    </Stack>
  );
};

export default BasePicker;
