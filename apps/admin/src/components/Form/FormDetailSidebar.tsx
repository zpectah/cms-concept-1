import { ReactNode } from 'react';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { newItemKey, WithChildren } from '@common';
import { getFormattedDateString } from '../../utils';
import { registeredFormFields } from '../../enums';
import { SwitchField } from '../fields';
import { HiddenCard } from '../Card';
import { Literal } from '../Literal';

type FormDetailSidebarProps = Partial<WithChildren> & {
  created?: string;
  updated?: string;
  detailId?: string;
  disableActions?: boolean;
  cardContent?: ReactNode;
};

const FormDetailSidebar = ({
  children,
  detailId,
  created,
  updated,
  disableActions,
  cardContent,
}: FormDetailSidebarProps) => {
  const { t } = useTranslation(['form']);

  return (
    <Stack gap={2}>
      <HiddenCard visible={detailId !== newItemKey}>
        <Stack gap={2}>
          <Literal label={t('form:label.created')} value={getFormattedDateString(created)} />
          <Literal label={t('form:label.updated')} value={getFormattedDateString(updated, true)} />
          {cardContent}
        </Stack>
      </HiddenCard>
      {!disableActions && (
        <Stack>
          <SwitchField name={registeredFormFields.active} fieldProps={{ label: t('form:label.active') }} />
          <SwitchField
            name={registeredFormFields.deleted}
            fieldProps={{ label: t('form:label.deleted'), inputProps: { color: 'warning' } }}
            isDisabled={detailId === newItemKey}
          />
        </Stack>
      )}
      {children}
    </Stack>
  );
};

export default FormDetailSidebar;
