import { MenuItemProps } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Model } from '@common';
import { getConfig } from '../utils';

export const useModelMenuItems = (model: Model) => {
  const { model: configModel } = getConfig();
  const { t } = useTranslation(['options']);

  const getValueTranslation = (value: string) => t(value);

  const getTypeFieldOptions = (disabled?: string[]) => {
    const items: MenuItemProps[] = [];

    configModel[model].type.forEach((type) => {
      if (disabled?.includes(type)) return;

      items.push({
        value: type,
        children: getValueTranslation(type),
      });
    });

    return items;
  };

  return {
    typeFieldOptions: getTypeFieldOptions(),
    getValueTranslation,
  };
};
