import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ControlledForm, EmailField, InputField } from '../../../../components';
import { useBlacklistItemForm } from './useBlacklistItemForm';
import { registeredFormFields } from '../../../../enums';

const BlacklistItemForm = () => {
  const { t } = useTranslation(['common', 'form']);
  const { form, onSubmit } = useBlacklistItemForm();

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <Stack direction="row" gap={1} sx={{ width: '100%' }}>
        <EmailField
          name={registeredFormFields.email}
          fieldProps={{
            fullWidth: true,
            placeholder: t('modules:settings.tabs.blacklist.section.table.placeholder.email'),
          }}
          outerBoxProps={{ sx: { width: '50%' } }}
        />
        <Stack direction="row" alignItems="center" sx={{ px: 1, maxHeight: '56px' }}>
          {t('label.or')}
        </Stack>
        <InputField
          name={registeredFormFields.ipaddress}
          fieldProps={{
            fullWidth: true,
            placeholder: t('modules:settings.tabs.blacklist.section.table.placeholder.ipaddress'),
          }}
          outerBoxProps={{ sx: { width: '50%' } }}
        />
        <Button type="submit" variant="contained" color="inherit" size="small" sx={{ maxHeight: '56px' }}>
          <AddIcon />
        </Button>
      </Stack>
    </ControlledForm>
  );
};

export default BlacklistItemForm;
