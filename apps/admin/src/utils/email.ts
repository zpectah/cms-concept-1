import { VALID_EMAIL_REGEX } from '../constants';

export const isEmailValid = (email: string) => VALID_EMAIL_REGEX.test(email);
