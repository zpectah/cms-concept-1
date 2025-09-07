import { useMemo, forwardRef, ChangeEvent, ReactNode } from 'react';
import { Box, Chip, MenuItemProps } from '@mui/material';
import { Select, SelectProps } from '../../../components';
import { useAttachmentsQuery } from '../../../hooks-query';

type AttachmentsPickerProps = Omit<SelectProps, 'items'> & {
  ignored?: number[];
};

const AttachmentsPicker = forwardRef<HTMLSelectElement, AttachmentsPickerProps>((props, ref) => {
  const { ignored = [], onChange, multiple, ...rest } = props;

  const { attachmentsQuery } = useAttachmentsQuery();

  const { data: attachmentsData } = attachmentsQuery;

  const attachmentsItems = useMemo(() => {
    const attachments: MenuItemProps[] = [];

    attachmentsData?.forEach((category) => {
      if (ignored.includes(category.id)) return;

      attachments.push({
        id: String(category.id),
        value: category.id,
        children: category.name,
      });
    });

    return attachments.reverse();
  }, [ignored, attachmentsData]);

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
      items={attachmentsItems}
      onChange={changeHandler}
      multiple={multiple}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {(selected as number[]).map((value) => {
            const attachmentItem = attachmentsData?.find((attachment) => attachment.id === value);

            return <Chip key={value} label={attachmentItem?.name} color="secondary" variant="outlined" />;
          })}
        </Box>
      )}
      {...rest}
    />
  );
});

export default AttachmentsPicker;
