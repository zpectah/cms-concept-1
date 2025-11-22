import { CropperProps } from 'react-advanced-cropper';

export interface ImageCropperProps {
  open: boolean;
  onClose: () => void;
  cropSource: { source?: string; index: number } | null;
  onSave: (source: string, index: number) => void;
  cropperProps?: Partial<CropperProps>;
}
