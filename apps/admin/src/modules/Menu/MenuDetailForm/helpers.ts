import { getConfig } from '../../../utils';
import { IMenuDetailForm } from './types';

export const getMenuTypeDefaultValue = () => {
  const { model } = getConfig();

  return model.menu.default;
};

export const getMenuDetailFormDefaultValues = (): IMenuDetailForm => {
  return {
    id: 0,
    name: '',
    type: getMenuTypeDefaultValue(),
    active: true,
    deleted: false,
  };
};
