import { MenuItemProps } from '@mui/material';
import { Model } from '@common';
import { getConfig } from '../utils';
import { getOptionValue } from './getOptionValue';

export const useSelectOptions = () => {
  const { model: configModel } = getConfig();

  const getOptionsFromList = (list: (string | number)[]): MenuItemProps[] => {
    const tmpItems: MenuItemProps[] = [];

    list.forEach((item) => {
      tmpItems.push({
        value: item,
        children: String(item),
      });
    });

    return tmpItems;
  };

  const getTypeFieldOptions = (model: Model, disabled?: string[]) => {
    const tmpItems: MenuItemProps[] = [];

    configModel[model].type.forEach((type) => {
      if (disabled?.includes(type)) return;

      tmpItems.push({
        value: type,
        children: getOptionValue(type),
      });
    });

    return tmpItems;
  };

  return {
    getOptionsFromList,
    getTypeFieldOptions,
    getOptionValue,
  };
};
