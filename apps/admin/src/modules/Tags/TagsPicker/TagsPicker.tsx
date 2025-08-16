import { useMemo, forwardRef, ChangeEvent, ReactNode } from 'react';
import { Box, Chip, MenuItemProps } from '@mui/material';
import { Select, SelectProps } from '../../../components';
import { useTagsQuery } from '../../../hooks-query';

type TagsPickerProps = Omit<SelectProps, 'items'> & {
  ignored?: number[];
};

const TagsPicker = forwardRef<HTMLSelectElement, TagsPickerProps>((props, ref) => {
  const { ignored = [], onChange, multiple, ...rest } = props;

  const { tagsQuery } = useTagsQuery();

  const { data: tagsData } = tagsQuery;

  const tagsItems = useMemo(() => {
    const tags: MenuItemProps[] = [];

    tagsData?.forEach((tag) => {
      if (ignored.includes(tag.id)) return;

      tags.push({
        id: String(tag.id),
        value: tag.id,
        children: tag.name,
      });
    });

    return tags.reverse();
  }, [ignored, tagsData]);

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
      items={tagsItems}
      onChange={changeHandler}
      multiple={multiple}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {(selected as number[]).map((value) => {
            const tagsItem = tagsData?.find((tag) => tag.id === value);

            return <Chip key={value} label={tagsItem?.name} color="secondary" />;
          })}
        </Box>
      )}
      {...rest}
    />
  );
});

export default TagsPicker;
