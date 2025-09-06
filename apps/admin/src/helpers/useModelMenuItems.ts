import { MenuItemProps } from '@mui/material';
import { Model } from '@common';
import { getConfig } from '../utils';
import { getOptionValue } from './getOptionValue';

export const useModelMenuItems = (model: Model) => {
  const { model: configModel } = getConfig();

  const getTypeFieldOptions = (disabled?: string[]) => {
    const items: MenuItemProps[] = [];

    configModel[model].type.forEach((type) => {
      if (disabled?.includes(type)) return;

      items.push({
        value: type,
        children: getOptionValue(type),
      });
    });

    return items;
  };

  return {
    typeFieldOptions: getTypeFieldOptions(),
    getOptionValue,
  };
};
