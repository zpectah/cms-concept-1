import { forwardRef, useState, useEffect, ChangeEvent, FocusEvent, useMemo } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { NumberAltProps } from './types';
import { INPUT_NUMBER_NUMERIC_PATTERN } from './constants';
import Input from './Input';

const NumberAlt = forwardRef<HTMLInputElement, NumberAltProps>(
  (
    {
      pattern = INPUT_NUMBER_NUMERIC_PATTERN,
      onChange,
      onBlur,
      value = 0,
      min = -Infinity,
      max = -Infinity,
      step = 1,
      slotProps,
      centered = true,
      disabled,
      ...rest
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<number>(value ?? 0);

    const finalSlotProps = {
      htmlInput: { pattern, min, max, step, value, style: { textAlign: centered ? 'center' : 'initial' } },
      ...slotProps,
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);

      setInternalValue(val);
      onChange?.(val);
    };

    const handleBlur = (e: FocusEvent) => {
      setInternalValue(internalValue);

      onBlur?.(e as FocusEvent<HTMLInputElement>);
    };

    const handleDecrement = () => {
      if (min !== -Infinity && internalValue <= min) return;

      onChange?.(internalValue - step);
    };

    const handleIncrement = () => {
      if (max !== -Infinity && internalValue >= max) return;

      onChange?.(internalValue + step);
    };

    const isDisabled = useMemo(() => {
      if (disabled) return true;

      return (min !== -Infinity && internalValue <= min) || (max !== -Infinity && internalValue >= max);
    }, [min, max, internalValue, disabled]);

    useEffect(() => setInternalValue(value), [value]);

    return (
      <Input
        inputMode="numeric"
        slotProps={finalSlotProps}
        inputRef={ref}
        onChange={handleInputChange}
        onBlur={handleBlur}
        disabled={isDisabled}
        startAdornment={
          <IconButton onClick={handleDecrement}>
            <RemoveIcon />
          </IconButton>
        }
        endAdornment={
          <IconButton onClick={handleIncrement}>
            <AddIcon />
          </IconButton>
        }
        {...rest}
      />
    );
  }
);

export default NumberAlt;
