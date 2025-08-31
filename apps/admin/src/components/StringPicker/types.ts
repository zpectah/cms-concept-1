export interface StringPickerProps {
  value: string[];
  onChange: (value: string[]) => void;
  isError?: boolean;
}
