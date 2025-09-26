import { useTranslation } from 'react-i18next';
import { MenuItemProps } from '@mui/material';
import { Model } from '@common';
import { getConfig } from '../utils';
import { getOptionValue } from './getOptionValue';

export const useSelectOptions = () => {
  const { model: configModel } = getConfig();
  const { t } = useTranslation();

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

  const getTranslatedOptionsFromList = (list: (string | number)[], prefix?: string): MenuItemProps[] => {
    const tmpItems: MenuItemProps[] = [];

    list.forEach((item) => {
      tmpItems.push({
        value: item,
        children: t(`options:${prefix ? `${prefix}.` : ''}${String(item)}`),
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
        children: getOptionValue(type, 'model'),
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
