import { menuTypeDefault } from '@common';
import { IMenuDetailForm } from './types';

export const getMenuDetailFormDefaultValues = (): IMenuDetailForm => {
  return {
    id: 0,
    name: '',
    type: menuTypeDefault,
    active: true,
    deleted: false,
  };
};
