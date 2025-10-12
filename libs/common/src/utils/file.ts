export const getClearFileName = (filename: string) => {
  const lastDot = filename.lastIndexOf('.');

  if (lastDot === -1) return filename;

  return filename.substring(0, lastDot);
};

export const getFileExtension = (filename: string) => filename.split('.').pop()?.toLowerCase() || '';

export const cropBase64Image = ({
  base64,
  x,
  y,
  width,
  height,
}: {
  base64: string;
  x: number;
  y: number;
  width: number;
  height: number;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.src = base64;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return reject('Canvas not supported');

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
      resolve(canvas.toDataURL());
    };
    img.onerror = (err) => reject(err);
  });
};

export const base64ToBlob = (base64: string) => {
  const [meta, data] = base64.split(',');
  const mime = meta.match(/:(.*?);/)?.[1];
  const binary = atob(data);
  const array = Uint8Array.from(binary, (c) => c.charCodeAt(0));

  return new Blob([array], { type: mime });
};

export const getBase64Size = (base64: string) => {
  const blob = base64ToBlob(base64);

  if (!blob) return 0;

  return blob.size;
};

export const formatBytes = (bytes: number, decimals = 1): string => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${size} ${sizes[i]}`;
};
