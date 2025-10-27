import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { getConfig } from '../../../utils';
import { ControlledForm, FormDetailSidebar, FormDetailActions, FormLayout, Literal } from '../../../components';
import { useMessagesDetailForm } from './useMessagesDetailForm';

const MessagesDetailForm = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['common', 'form']);
  const { detailId, form, onSubmit, onRead } = useMessagesDetailForm();

  const values = useWatch({ control: form.control });

  return (
    <ControlledForm key={detailId} form={form} formProps={{ onSubmit }}>
      <FormLayout
        actions={
          <FormDetailActions detailId={detailId} listPath={`/${routes.messages.path}`} disableActions>
            <Button
              size="large"
              color="secondary"
              variant="outlined"
              onClick={() => detailId && onRead(detailId)}
              disabled={values.read}
            >
              {t('button.markAsRead')}
            </Button>
          </FormDetailActions>
        }
        sidebar={
          <FormDetailSidebar detailId={detailId} created={values.created} updated={values.updated} disableActions />
        }
      >
        <Literal label={t('form:label.name')} value={values.name} />
        <Literal label={t('form:label.type')} value={values.type} />
        <Literal label={t('form:label.sender')} value={values.sender} />
        <Literal label={t('form:label.subject')} value={values.subject} />
        <Literal label={t('form:label.content')} value={values.content} />
      </FormLayout>
    </ControlledForm>
  );
};

export default MessagesDetailForm;
