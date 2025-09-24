import { useMemo, useState } from 'react';
import { Button, Stack, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Input } from '../input';
import { BasePickerProps } from './types';

const BasePicker = ({
  value,
  onChange,
  renderValue,
  renderInput,
  isValueValid,
  chipProps,
  stackProps,
}: BasePickerProps) => {
  const [tempValue, setTempValue] = useState<string>('');

  const valueValid = useMemo(() => (isValueValid ? isValueValid?.(tempValue) : true), [isValueValid, tempValue]);

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
    <Stack gap={1} {...stackProps}>
      {value.length > 0 && (
        <Stack direction="row" gap={1}>
          {value.map((item, index) =>
            renderValue ? (
              renderValue(item, index)
            ) : (
              <Chip
                key={index}
                label={item}
                onDelete={() => removeHandler(index)}
                variant="outlined"
                color="primary"
                {...chipProps}
              />
            )
          )}
        </Stack>
      )}
      <Stack direction="row" gap={1}>
        {renderInput ? (
          renderInput(tempValue, (value) => setTempValue(value))
        ) : (
          <Input
            name="base-picker-input"
            value={tempValue}
            onChange={(event) => setTempValue(event.target.value)}
            sx={{ width: { xs: '100%', md: '33%' } }}
          />
        )}
        <Button onClick={addHandler} color="inherit" disabled={!(tempValue.length >= 3) || !valueValid} size="small">
          <AddIcon />
        </Button>
      </Stack>
    </Stack>
  );
};

export default BasePicker;
