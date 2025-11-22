const NUMBER = '0123456789' as const;
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz' as const;
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' as const;
const SPECIAL = '!#$%&()*+,-./:;<=>?@[]^_`{|}~' as const;

export const getRandomString = (length = 12) => {
  let result = '';
  const characters = `${UPPERCASE}${LOWERCASE}${NUMBER}`;
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
};

export const getRandomPassword = ({
  length,
  number,
  lowercase,
  uppercase,
  special,
}: {
  length: number;
  number: boolean;
  lowercase: boolean;
  uppercase: boolean;
  special: boolean;
}) => {
  let result = '';
  let pool = '';

  const characters = {
    number: NUMBER,
    lowercase: LOWERCASE,
    uppercase: UPPERCASE,
    special: SPECIAL,
  };

  if (number) pool += characters.number;
  if (lowercase) pool += characters.lowercase;
  if (uppercase) pool += characters.uppercase;
  if (special) pool += characters.special;

  if (!pool) {
    throw new Error('At least one character type must be selected.');
  }

  const requiredChars: string[] = [];
  if (number) requiredChars.push(characters.number[Math.floor(Math.random() * characters.number.length)]);
  if (lowercase) requiredChars.push(characters.lowercase[Math.floor(Math.random() * characters.lowercase.length)]);
  if (uppercase) requiredChars.push(characters.uppercase[Math.floor(Math.random() * characters.uppercase.length)]);
  if (special) requiredChars.push(characters.special[Math.floor(Math.random() * characters.special.length)]);

  for (let i = requiredChars.length; i < length; i++) {
    result += pool[Math.floor(Math.random() * pool.length)];
  }

  result += requiredChars.join('');

  result = result
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  return result;
};

export const getCapitalizedString = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const getSafeArrayFromString = (value: string) => {
  if (value === '') return [];

  return value.split(',');
};

export const getRandomStringFromArraySet = (
  words: string[],
  options: { paragraphs: number; sentences: number; words: number }
) => {
  function getRandomWord(): string {
    return words[Math.floor(Math.random() * words.length)];
  }

  function generateSentence(wordsCount: number): string {
    const words = Array.from({ length: wordsCount }, () => getRandomWord());
    return getCapitalizedString(words.join(' ')) + '.';
  }

  function generateParagraph(sentencesCount: number, wordsPerSentence: number): string {
    return Array.from({ length: sentencesCount }, () => generateSentence(wordsPerSentence)).join(' ');
  }

  function generateLoremIpsum(paragraphs: number, sentences: number, words: number): string {
    return Array.from({ length: paragraphs }, () => generateParagraph(sentences, words)).join('\n\n');
  }

  return generateLoremIpsum(options.paragraphs, options.sentences, options.words);
};

export const getRandomId = (length = 16) =>
  getRandomPassword({
    length,
    number: true,
    lowercase: true,
    uppercase: true,
    special: false,
  });

export const getFormattedString = (...args: string[]): string => {
  const combinedString = args.join('-');

  let dashedString = combinedString.replace(/ /g, '-');

  dashedString = dashedString.replace(/-+/g, '-');
  dashedString = dashedString.replace(/^-|-$/g, '');

  return dashedString.toLowerCase();
};

export const getShortenedFilename = (filename: string, maxLength: number, placeholder = '...'): string => {
  if (filename.length <= maxLength) {
    return filename;
  }

  const lastDotIndex = filename.lastIndexOf('.');

  if (lastDotIndex === -1 || lastDotIndex === 0) {
    const start = maxLength - placeholder.length;

    return filename.substring(0, start) + placeholder;
  }

  const extension = filename.substring(lastDotIndex);
  const name = filename.substring(0, lastDotIndex);

  const maxNameLength = maxLength - placeholder.length - extension.length;

  const prefixLength = Math.floor(maxNameLength / 2);
  const suffixLength = maxNameLength - prefixLength;

  if (prefixLength < 1 || suffixLength < 1) {
    return name.substring(0, 1) + placeholder + extension;
  }

  const prefix = name.substring(0, prefixLength);
  const suffix = name.substring(name.length - suffixLength);

  return prefix + placeholder + suffix + extension;
};
