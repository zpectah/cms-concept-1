import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileUploaderQueueItem } from '../../types';
import { getClearFileName, getFileExtension, getRandomId } from '@common';
import { getTypeFromExtension } from '../../utils';
import { useAppStore } from '../../store';
import { fileUploaderQueueItemContextKeys } from '../../enums';
import { UseAvatarUploaderProps } from './types';

export const useAvatarUploader = ({ onLoad, onLoadEnd, onError, onFinish }: UseAvatarUploaderProps) => {
  const [result, setResult] = useState<FileUploaderQueueItem | null>(null);
  const inputElementRef = useRef<HTMLInputElement | null>(null);

  const { t } = useTranslation(['common']);
  const { addToast } = useAppStore();

  const timestamp = Date.now();

  const fileHandler = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    const readerPromise = new Promise<FileUploaderQueueItem>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        onLoadEnd?.(result);
      };

      reader.onload = () => {
        const base64 = reader.result as string;
        const extension = getFileExtension(file.name);

        resolve({
          content: base64,
          mime: file.type,
          size: file.size,
          name: getClearFileName(file.name),
          extension,
          type: getTypeFromExtension(extension),
          uid: getRandomId(),
          context: fileUploaderQueueItemContextKeys['avatar-user'],
        });

        onLoad?.();
      };

      reader.onerror = () => {
        reject(reader.error);
        onError?.(reader.error);
      };

      reader.readAsDataURL(file);
    });

    readerPromise
      .then((fileResult) => {
        setResult(fileResult);
        onFinish?.(fileResult);
      })
      .catch((err) => {
        console.warn(err);
        addToast(t('message.error.fileUpload'), 'error');
        setResult(null);
      })
      .finally(() => {
        inputElementRef.current && (inputElementRef.current.value = '');
      });
  };

  return {
    inputElementRef,
    result,
    setResult,
    onInputChange: fileHandler,
    timestamp,
  };
};
