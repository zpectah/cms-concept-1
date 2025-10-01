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
