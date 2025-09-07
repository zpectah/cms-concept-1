import { Stack, Chip, StackProps, ChipProps } from '@mui/material';

interface ValueArrayProps {
  value: (string | number)[];
  stackProps?: Partial<StackProps>;
  chipProps?: Partial<ChipProps>;
}

const ValueArray = ({ value, stackProps, chipProps }: ValueArrayProps) => (
  <Stack direction="row" gap={0.5} alignItems="center" justifyContent="end" sx={{ flex: 1 }} {...stackProps}>
    {value.map((val) => (
      <Chip key={val} label={val} size="small" {...chipProps} />
    ))}
  </Stack>
);

export default ValueArray;
