import { useState, useRef } from 'react';
import { Box } from '@mui/material';
import { getClearFileName, getFileExtension } from '@common';
import { FileUploaderQueue, FileUploaderQueueItem } from '../../../types';
import { FileUploaderProps } from './types';

const FileUploader = ({ onQueueUpdate, renderQueue, multiple = true, boxProps }: FileUploaderProps) => {
  const [queue, setQueue] = useState<FileUploaderQueue>([]);

  const inputElement = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const readers = Array.from(files).map(
      (file) =>
        new Promise<FileUploaderQueueItem>((resolve, reject) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            console.log('on load end');
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

            console.log('on load');
          };

          reader.onerror = () => {
            reject(reader.error);

            console.log('on error');
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

  return (
    <Box {...boxProps}>
      <input type="file" multiple={multiple} onChange={(e) => handleFiles(e.target.files)} ref={inputElement} />

      {renderQueue?.(queue)}
    </Box>
  );
};

export default FileUploader;
