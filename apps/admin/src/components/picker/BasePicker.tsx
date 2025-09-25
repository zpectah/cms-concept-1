import { useMemo, useState } from 'react';
import { Button, Stack, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LabelIcon from '@mui/icons-material/Label';
import { UI_SPACING } from '../../constants';
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
  placeholder,
}: BasePickerProps) => {
  const [tempValue, setTempValue] = useState<string>('');
  const [errDuplicity, setErrDuplicity] = useState(false);

  const valueIsValid = useMemo(() => (isValueValid ? isValueValid?.(tempValue) : true), [isValueValid, tempValue]);

  const inputSx = { width: { xs: '100%', md: '33%' } };

  const addHandler = () => {
    setErrDuplicity(false);

    const newState = [...value];
    const index = newState.indexOf(tempValue);

    if (index > -1) {
      setErrDuplicity(true);
    } else {
      newState.push(tempValue);

      onChange(newState);
      setTempValue('');
    }
  };

  const removeHandler = (index: number) => {
    const newState = [...value];

    newState.splice(index, 1);

    onChange(newState);
  };

  return (
    <Stack direction="column" gap={UI_SPACING.action} {...stackProps}>
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
      <Stack direction="row" gap={0.5}>
        {renderInput ? (
          renderInput(tempValue, (value) => setTempValue(value), inputSx, placeholder, errDuplicity)
        ) : (
          <Input
            name="base-picker-input"
            value={tempValue}
            onChange={(event) => setTempValue(event.target.value)}
            startAdornment={<LabelIcon />}
            sx={inputSx}
            error={errDuplicity}
            placeholder={placeholder}
          />
        )}
        <Button
          onClick={addHandler}
          color="inherit"
          disabled={!(tempValue.length >= 3) || !valueIsValid}
          size="small"
          variant="contained"
        >
          <AddIcon />
        </Button>
      </Stack>
    </Stack>
  );
};

export default BasePicker;
