import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { menuTypeDefault } from '@common';
import { registeredFormFields } from '../../../enums';
import { getConfig } from '../../../config';
import {
  ControlledForm,
  FormDetailSidebar,
  FormDetailActions,
  FormLayout,
  InputField,
  SelectField,
  DynamicPortal,
} from '../../../components';
import { MenuItemsManager } from '../../MenuItems';
import { useUserActions } from '../../../hooks';
import { useMenuDetailForm } from './useMenuDetailForm';

const MenuDetailForm = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['common', 'form']);
  const { menu: modelActions } = useUserActions();
  const { detailId, form, onSubmit, fieldOptions } = useMenuDetailForm();

  const dynamicSlotId = 'portal-transport-menu-items';

  const created = useWatch({ name: registeredFormFields.created, control: form.control });
  const updated = useWatch({ name: registeredFormFields.updated, control: form.control });

  return (
    <>
      <ControlledForm key={detailId} form={form} formProps={{ onSubmit }}>
        <FormLayout
          actions={
            <FormDetailActions detailId={detailId} listPath={`/${routes.menu.path}`} modelActions={modelActions} />
          }
          sidebar={<FormDetailSidebar detailId={detailId} created={created} updated={updated} />}
        >
          <InputField name={registeredFormFields.name} label={t('form:label.name')} isRequired />
          <SelectField
            name={registeredFormFields.type}
            label={t('form:label.type')}
            items={fieldOptions.type}
            fieldProps={{ defaultValue: menuTypeDefault, sx: { width: { xs: '100%', md: '33%' } } }}
          />
          <div id={dynamicSlotId} style={{ marginTop: '1rem' }} />
        </FormLayout>
      </ControlledForm>

      {/* We must render out of the main form due to context conflict */}
      <DynamicPortal targetId={dynamicSlotId}>
        <MenuItemsManager isEnabled menuId={detailId} />
      </DynamicPortal>
    </>
  );
};

export default MenuDetailForm;
