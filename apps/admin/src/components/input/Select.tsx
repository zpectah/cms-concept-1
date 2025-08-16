import { forwardRef } from 'react';
import { Select as MuiSelect, MenuItem } from '@mui/material';
import { SelectProps } from './types';

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, items = [], readOnly, defaultValue, ...rest }, ref) => {
    const slotProps = {
      input: { readOnly, sx: { fontFamily: '"JetBrains Mono Variable", monospace' } },
      ...rest.slotProps,
    };

    return (
      <MuiSelect inputRef={ref} defaultValue={defaultValue ?? null} slotProps={slotProps} {...rest}>
        {items.map((item, index) => (
          <MenuItem key={String(item.value)} {...item} />
        ))}
        {children}
      </MuiSelect>
    );
  }
);

export default Select;
