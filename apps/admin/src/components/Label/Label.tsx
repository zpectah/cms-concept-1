import { styled } from '@mui/material';
import { LabelProps } from './types';

const LabelWrapper = styled('label')(({ theme }) => ({
  ...theme.typography.button,
}));

const Label = ({ children, isRequired }: LabelProps) => (
  <LabelWrapper>
    {children}&nbsp;{isRequired && '*'}
  </LabelWrapper>
);

export default Label;
