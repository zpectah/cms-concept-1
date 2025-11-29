import { useMemo, forwardRef, ChangeEvent, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, MenuItemProps } from '@mui/material';
import { Select, SelectProps } from '../../../components';
import { useMenuItemsQuery } from '../../../hooks-query';

type MenuItemsPickerProps = Omit<SelectProps, 'items'> & {
  ignored?: number[];
  menuId: string;
};

const MenuItemsPicker = forwardRef<HTMLSelectElement, MenuItemsPickerProps>((props, ref) => {
  const { ignored = [], menuId, onChange, multiple, ...rest } = props;

  const { t } = useTranslation(['common']);
  const { menuMenuItemsQuery } = useMenuItemsQuery({ menuId });

  const { data: menuItemsData } = menuMenuItemsQuery;

  const MenuItemsItems = useMemo(() => {
    const MenuItems: MenuItemProps[] = [];

    if (!multiple)
      MenuItems.push({
        id: '0',
        value: 0,
        children: t('label.notSelected'),
      });

    menuItemsData?.forEach((item) => {
      if (ignored.includes(item.id)) return;

      const prefix = `[${item.type[0].toUpperCase()}]`;

      MenuItems.push({
        id: String(item.id),
        value: item.id,
        children: `${prefix} ${item.name}`,
      });
    });

    return MenuItems.reverse();
  }, [ignored, menuItemsData, multiple]);

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement> | (Event & { target: { value: unknown; name: string } }),
    child: ReactNode
  ) => {
    const value = event.target.value as string;

    onChange?.(event, value);
  };

  const multipleProps = useMemo(() => {
    const baseProps: Pick<SelectProps, 'multiple' | 'renderValue'> = {};

    if (multiple) {
      baseProps.multiple = true;
      baseProps.renderValue = (selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {(selected as number[]).map((value) => {
            const categoryItem = menuItemsData?.find((item) => item.id === value);

            return <Chip key={value} label={categoryItem?.name} color="secondary" variant="outlined" />;
          })}
        </Box>
      );
    }

    return baseProps;
  }, [menuItemsData, multiple]);

  return <Select ref={ref} items={MenuItemsItems} onChange={changeHandler} {...multipleProps} {...rest} />;
});

export default MenuItemsPicker;
