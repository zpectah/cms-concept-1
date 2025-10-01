import { attachmentsTypeKeys, AttachmentsType } from '@common';
import { fileUploaderSupportedFileExtensions } from '../constants/fileUploader';

export const getTypeFromExtension = (extension: string): AttachmentsType => {
  const mapping: Record<string, string> = {
    image: attachmentsTypeKeys.image,
    audio: attachmentsTypeKeys.audio,
    video: attachmentsTypeKeys.video,
    document: attachmentsTypeKeys.document,
    archive: attachmentsTypeKeys.archive,
  };

  for (const [key, type] of Object.entries(mapping)) {
    if (
      fileUploaderSupportedFileExtensions[key as keyof typeof fileUploaderSupportedFileExtensions].includes(extension)
    ) {
      return type as AttachmentsType;
    }
  }

  return attachmentsTypeKeys.unsupported;
};
