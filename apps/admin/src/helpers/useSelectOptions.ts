import { MenuItemProps } from '@mui/material';
import { Model } from '@common';
import { getConfig } from '../utils';
import { getOptionValue } from './getOptionValue';

export const useSelectOptions = () => {
  const { model: configModel } = getConfig();

  const getOptionsFromList = (list: (string | number)[]) => {
    const tmpItems: MenuItemProps[] = [];

    list.forEach((item) => {
      tmpItems.push({
        value: item,
        children: String(item),
      });
    });

    return tmpItems;
  };

  const getTranslatedOptionsFromList = (list: (string | number)[], prefix?: string) => {
    const tmpItems: MenuItemProps[] = [];

    list.forEach((item) => {
      tmpItems.push({
        value: item,
        children: getOptionValue(String(item), prefix),
      });
    });

    return tmpItems;
  };

  const getTypeFieldOptions = (model: Model, disabled?: string[]) => {
    const tmpItems: MenuItemProps[] = [];

    configModel[model].type.forEach((item) => {
      if (disabled?.includes(item)) return;

      tmpItems.push({
        value: item,
        children: getOptionValue(item, 'model'),
      });
    });

    return tmpItems;
  };

  return {
    getOptionsFromList,
    getTranslatedOptionsFromList,
    getTypeFieldOptions,
  };
};
