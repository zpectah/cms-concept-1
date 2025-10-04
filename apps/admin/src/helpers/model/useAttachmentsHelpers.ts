import { Attachments, AttachmentsItem } from '@common';
import { FileUploaderQueue } from '../../types';
import { fileUploaderMaxFileSize } from '../../constants';
import { registeredFormFields } from '../../enums';

export const useAttachmentsHelpers = () => {
  const isAttributeUnique = (attachments: Attachments, key: keyof AttachmentsItem, value: string) => {
    const results = attachments.filter((item) => String(item[key]) === String(value)) ?? [];

    return {
      isUnique: results.length === 0,
    };
  };

  const checkQueueDuplicities = (
    queue: FileUploaderQueue,
    attachments: Attachments
  ): { isValid: boolean; duplicities?: number[] } => {
    const duplicities: number[] = [];
    const seen = new Map<string, number>();

    queue.forEach((item, index) => {
      const { isUnique } = isAttributeUnique(
        attachments,
        registeredFormFields.file_name,
        `${item.name}.${item.extension}`
      );

      if (!isUnique) duplicities.push(index);
    });

    queue.forEach((item, index) => {
      const fileName = `${item.name}.${item.extension}`;
      if (seen.has(fileName)) {
        duplicities.push(index);
        duplicities.push(seen.get(fileName)!);
      } else {
        seen.set(fileName, index);
      }
    });

    if (duplicities.length > 0) {
      return { isValid: false, duplicities };
    }

    return { isValid: true };
  };

  const isValidFileSize = (size: number) => size <= fileUploaderMaxFileSize;

  return {
    isAttributeUnique,
    checkQueueDuplicities,
    isValidFileSize,
  };
};
