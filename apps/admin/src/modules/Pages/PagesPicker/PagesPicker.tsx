import { useMemo, forwardRef, ChangeEvent, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, MenuItemProps } from '@mui/material';
import { Select, SelectProps } from '../../../components';
import { usePagesQuery } from '../../../hooks-query';

type PagesPickerProps = Omit<SelectProps, 'items'> & {
  ignored?: number[];
};

const PagesPicker = forwardRef<HTMLSelectElement, PagesPickerProps>((props, ref) => {
  const { ignored = [], onChange, multiple, ...rest } = props;

  const { t } = useTranslation(['common']);
  const { pagesQuery } = usePagesQuery({});

  const { data: pagesData } = pagesQuery;

  const pagesItems = useMemo(() => {
    const pages: MenuItemProps[] = [];

    if (!multiple)
      pages.push({
        id: '0',
        value: 0,
        children: t('label.notSelected'),
      });

    pagesData?.forEach((page) => {
      if (ignored.includes(page.id)) return;

      pages.push({
        id: String(page.id),
        value: page.id,
        children: page.name,
      });
    });

    return pages.reverse();
  }, [ignored, pagesData, multiple]);

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
            const categoryItem = pagesData?.find((page) => page.id === value);

            return <Chip key={value} label={categoryItem?.name} color="secondary" variant="outlined" />;
          })}
        </Box>
      );
    }

    return baseProps;
  }, [pagesData, multiple]);

  return <Select ref={ref} items={pagesItems} onChange={changeHandler} {...multipleProps} {...rest} />;
});

export default PagesPicker;
