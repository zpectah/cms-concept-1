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

    categoriesData?.forEach((category) => {
      if (ignored.includes(category.id)) return;

      categories.push({
        id: String(category.id),
        value: category.id,
        children: category.name,
      });
    });

    return categories.reverse();
  }, [ignored, categoriesData]);

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement> | (Event & { target: { value: unknown; name: string } }),
    child: ReactNode
  ) => {
    const value = event.target.value as string;

    onChange?.(event, value);
  };

  return (
    <Select
      ref={ref}
      items={categoriesItems}
      onChange={changeHandler}
      multiple={multiple}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {(selected as number[]).map((value) => {
            const categoryItem = categoriesData?.find((category) => category.id === value);

            return <Chip key={value} label={categoryItem?.name} color="secondary" />;
          })}
        </Box>
      )}
      {...rest}
    />
  );
});

export default CategoriesPicker;
