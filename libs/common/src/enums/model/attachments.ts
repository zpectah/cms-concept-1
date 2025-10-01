export const attachmentsTypeKeys = {
  unknown: 'unknown',
  unsupported: 'unsupported',
  image: 'image',
  audio: 'audio',
  video: 'video',
  document: 'document',
  archive: 'archive',
} as const;

export const attachmentsTypeKeysArray = [...Object.keys(attachmentsTypeKeys)] as [string, ...string[]];
