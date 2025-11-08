import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { registeredFormFields } from '../../../enums';
import { getConfig } from '../../../utils';
import {
  ControlledForm,
  FormDetailSidebar,
  FormDetailActions,
  FormLayout,
  InputField,
  SelectField,
} from '../../../components';
import { useMenuDetailForm } from './useMenuDetailForm';
import { MenuItemsManager } from '../../MenuItems';
import { menuTypeDefault } from '@common';

const MenuDetailForm = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['common', 'form']);
  const { detailId, form, onSubmit, fieldOptions } = useMenuDetailForm();

  const created = useWatch({ name: registeredFormFields.created, control: form.control });
  const updated = useWatch({ name: registeredFormFields.updated, control: form.control });

  return (
    <ControlledForm key={detailId} form={form} formProps={{ onSubmit }}>
      <FormLayout
        actions={<FormDetailActions detailId={detailId} listPath={`/${routes.menu.path}`} />}
        sidebar={<FormDetailSidebar detailId={detailId} created={created} updated={updated} />}
        actionbar={<MenuItemsManager isEnabled menuId={detailId} />}
      >
        <InputField name={registeredFormFields.name} label={t('form:label.name')} isRequired />
        <SelectField
          name={registeredFormFields.type}
          label={t('form:label.type')}
          items={fieldOptions.type}
          fieldProps={{ defaultValue: menuTypeDefault, sx: { width: { xs: '100%', md: '33%' } } }}
        />
      </FormLayout>
    </ControlledForm>
  );
};

export default MenuDetailForm;
