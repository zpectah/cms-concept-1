import { useTranslation } from 'react-i18next';
import { Stack, Button } from '@mui/material';
import { menuItemsTypeKeys, menuTypeDefault, newItemKey } from '@common';
import {
  DialogBase,
  ControlledForm,
  InputField,
  SelectField,
  NumberAltField,
  LocalesTabs,
  SwitchField,
} from '../../../../components';
import { registeredFormFields } from '../../../../enums';
import { PagesPickerField } from '../../../Pages';
import { MenuItemsPickerField } from '../../MenuItemsPicker';
import { useMenuItemsManagerContext } from '../MenuItemsManager.context';
import { useMenuItemsDetailForm } from './useMenuItemsDetailForm';

interface MenuItemsDetailFormProps {
  menuId?: string;
}

const MenuItemsDetailForm = ({ menuId }: MenuItemsDetailFormProps) => {
  const { t } = useTranslation(['common']);
  const { detailId, setDetailId } = useMenuItemsManagerContext();
  const { form, onSubmit, fieldOptions, locale, locales, onLocaleChange, onReset } = useMenuItemsDetailForm({
    id: detailId,
    menuId,
  });

  const type = form.watch(registeredFormFields.type);
  const name = form.watch(registeredFormFields.name);

  return (
    <DialogBase
      title={detailId === newItemKey ? t('label.createNewItem') : name}
      dialogProps={{
        maxWidth: 'md',
        fullWidth: true,
        keepMounted: true,
      }}
      open={!!detailId}
      onClose={() => setDetailId(null)}
      content={
        <ControlledForm form={form} formProps={{ onSubmit, id: 'MenuItemsDetailForm' }}>
          <Stack gap={2}>
            <InputField name={registeredFormFields.name} label={t('form:label.name')} isRequired />
            <SelectField
              name={registeredFormFields.type}
              label={t('form:label.type')}
              items={fieldOptions.type}
              fieldProps={{ defaultValue: menuTypeDefault, sx: { width: { xs: '100%', md: '33%' } } }}
            />

            <NumberAltField
              name={registeredFormFields.item_order}
              label={t('form:label.item_order')}
              isRequired
              fieldProps={{ sx: { width: { xs: '100%', md: '33%' } } }}
            />

            <MenuItemsPickerField
              menuId={menuId as string}
              name={registeredFormFields.parent_id}
              label={t('form:label.parent_id')}
              ignored={[typeof detailId === 'number' ? detailId : 0]}
              fieldProps={{ sx: { width: { xs: '100%', md: '33%' } } }}
            />

            {type === menuItemsTypeKeys.default && (
              <PagesPickerField
                name={registeredFormFields.link_page}
                label={t('form:label.link_page')}
                isRequired={type === menuItemsTypeKeys.default}
                fieldProps={{ sx: { width: { xs: '100%', md: '33%' } } }}
              />
            )}
            {type === menuItemsTypeKeys.external && (
              <InputField
                name={registeredFormFields.link_url}
                label={t('form:label.link_url')}
                isRequired={type === menuItemsTypeKeys.external}
              />
            )}

            <LocalesTabs
              locales={locales}
              locale={locale}
              onLocaleChange={onLocaleChange}
              render={(loc) => (
                <InputField
                  name={`${registeredFormFields.locale}.${loc}.${registeredFormFields.label}`}
                  label={t('form:label.label')}
                  isRequired
                />
              )}
            />

            <Stack>
              <SwitchField name={registeredFormFields.active} fieldProps={{ label: t('form:label.active') }} />
              <SwitchField
                name={registeredFormFields.deleted}
                fieldProps={{ label: t('form:label.deleted'), inputProps: { color: 'warning' } }}
                isDisabled={detailId === newItemKey}
              />
            </Stack>
          </Stack>
        </ControlledForm>
      }
      actions={
        <>
          <Button type="submit" form="MenuItemsDetailForm" variant="contained">
            {detailId === newItemKey ? t('button.create') : t('button.update')}
          </Button>
          <Button type="reset" variant="outlined" color="warning" onClick={onReset}>
            {t('button.reset')}
          </Button>
          <Button variant="outlined" color="inherit" onClick={() => setDetailId(null)}>
            {t('button.cancel')}
          </Button>
        </>
      }
    />
  );
};

export default MenuItemsDetailForm;
