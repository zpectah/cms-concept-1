import { Attachments, AttachmentsItem } from '@common';

export const useUniqueAttachments = () => {
  const isAttributeUnique = (attachments: Attachments, key: keyof AttachmentsItem, value: string) => {
    const results = attachments.filter((item) => String(item[key]) === String(value)) ?? [];

    return {
      isUnique: results.length === 0,
      results,
    };
  };

  return {
    isAttributeUnique,
  };
};
