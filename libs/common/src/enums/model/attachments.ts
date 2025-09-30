export const attachmentsTypeKeys = {
  unknown: 'unknown',
  image: 'image',
  audio: 'audio',
  video: 'video',
  document: 'document',
  archive: 'archive',
} as const;

export const attachmentsTypeKeysArray = [...Object.keys(attachmentsTypeKeys)] as [string, ...string[]];
