import { useRef, useState } from 'react';
import { getClearFileName, getFileExtension } from '@common';
import { FileUploaderQueue, FileUploaderQueueItem } from '../../types';
import { useFileUploaderProps } from './types';

export const useFileUploader = ({
  initialQueue,
  onLoad,
  onLoadEnd,
  onError,
  onQueueUpdate,
  multiple,
}: useFileUploaderProps) => {
  const [queue, setQueue] = useState<FileUploaderQueue>(initialQueue ?? []);

  const inputElement = useRef<HTMLInputElement | null>(null);

  const fileListHandler = (files: FileList | null) => {
    if (!files) return;

    const readers = Array.from(files).map(
      (file) =>
        new Promise<FileUploaderQueueItem>((resolve, reject) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            onLoadEnd?.();
          };
          reader.onload = () => {
            const base64 = reader.result as string;

            resolve({
              content: base64,
              mime: file.type,
              size: file.size,
              name: getClearFileName(file.name),
              filename: file.name,
              extension: getFileExtension(file.name),
            });

            onLoad?.();
          };

          reader.onerror = () => {
            reject(reader.error);
            onError?.(reader.error);
          };

          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((results) => {
      const newQueue = multiple ? [...queue, ...results] : results;

      setQueue(newQueue);
      onQueueUpdate?.(newQueue);

      inputElement.current && (inputElement.current.value = '');
    });
  };

  return {
    queue,
    inputElement,
    onInputChange: fileListHandler,
  };
};
