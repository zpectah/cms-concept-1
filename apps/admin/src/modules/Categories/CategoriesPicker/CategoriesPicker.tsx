import { useMemo, forwardRef, ChangeEvent, ReactNode } from 'react';
import { Box, Chip, MenuItemProps } from '@mui/material';
import { Select, SelectProps } from '../../../components';
import { useCategoriesQuery } from '../../../hooks-query';

type CategoriesPickerProps = Omit<SelectProps, 'items'> & {
  ignored?: number[];
};

const CategoriesPicker = forwardRef<HTMLSelectElement, CategoriesPickerProps>((props, ref) => {
  const { ignored = [], onChange, multiple, ...rest } = props;

  const { categoriesQuery } = useCategoriesQuery();

  const { data: categoriesData } = categoriesQuery;

  const categoriesItems = useMemo(() => {
    const categories: MenuItemProps[] = [];

    if (!multiple)
      categories.push({
        id: '0',
        value: 0,
        children: 'Not selected',
      });

    categoriesData?.forEach((category) => {
      if (ignored.includes(category.id)) return;

      categories.push({
        id: String(category.id),
        value: category.id,
        children: category.name,
      });
    });

    return categories.reverse();
  }, [ignored, categoriesData, multiple]);

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
            const categoryItem = categoriesData?.find((category) => category.id === value);

            return <Chip key={value} label={categoryItem?.name} color="secondary" />;
          })}
        </Box>
      );
    }

    return baseProps;
  }, [categoriesData, multiple]);

  return <Select ref={ref} items={categoriesItems} onChange={changeHandler} {...multipleProps} {...rest} />;
});

export default CategoriesPicker;
