import { CSSProperties } from 'react';
import { SvgIconProps } from '@mui/material';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { attachmentsTypeKeys, AttachmentsType } from '@common';

export const useAttachmentTypeElement = () => {
  const getElementByType = (
    type: AttachmentsType,
    {
      source,
      alt,
      imgStyle,
      iconProps,
    }: { source?: string; alt?: string; imgStyle?: CSSProperties; iconProps?: Partial<SvgIconProps> }
  ) => {
    switch (type) {
      case attachmentsTypeKeys.image:
        return <img src={source} alt={alt} loading="lazy" style={imgStyle} />;

      case attachmentsTypeKeys.audio:
        return <AudioFileIcon {...iconProps} />;

      case attachmentsTypeKeys.video:
        return <VideoFileIcon {...iconProps} />;

      case attachmentsTypeKeys.document:
        return <PictureAsPdfIcon {...iconProps} />;

      case attachmentsTypeKeys.archive:
        return <DescriptionIcon {...iconProps} />;

      case attachmentsTypeKeys.unknown:
      default:
        return <HelpCenterIcon {...iconProps} />;
    }
  };

  const isTypeImage = (type: AttachmentsType) => type === attachmentsTypeKeys.image;

  return {
    getElementByType,
    isTypeImage,
  };
};
