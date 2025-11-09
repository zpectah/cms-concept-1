import { useTranslation } from 'react-i18next';
import { Button, Grid, Stack } from '@mui/material';
import { registeredFormFields } from '../../../enums';
import {
  ControlledForm,
  InputField,
  PasswordField,
  EmailField,
  FormContent,
  ActionBar,
  AvatarUploader,
  Literal,
  HiddenCard,
} from '../../../components';
import { useAccountForm } from './useAccountForm';

const AccountForm = () => {
  const { t } = useTranslation(['common', 'form']);
  const { userData, form, onSubmit, setAvatar, locked, setLocked } = useAccountForm();

  const watchedPassword = form.watch(registeredFormFields.password);
  const avatarImage = form.watch(registeredFormFields.avatar_image);

  return (
    <ControlledForm form={form} formProps={{ onSubmit }}>
      <FormContent>
        <Grid container>
          <Grid size={4}>
            <AvatarUploader
              name={userData?.user?.name ?? ''}
              current={avatarImage}
              hash={userData?.user?.avatar_hash}
              onFinish={(res) => {
                if (res) setAvatar(res);
              }}
              onRemove={() => {
                form.setValue(registeredFormFields.avatar_image, '');
              }}
              onLoadEnd={() => {
                setLocked(false);
              }}
            />
          </Grid>
          <Grid size={8}>
            <Stack direction="column" alignItems="start" justifyContent="center" gap={1} sx={{ height: '100%' }}>
              <Literal label={t('form:label.email')} value={userData?.user?.email} />
              <Literal
                label={t('form:label.fullName')}
                value={`${userData?.user?.first_name} ${userData?.user?.last_name}`}
              />

              <Button size="small" variant="outlined" color="inherit" onClick={() => setLocked(!locked)}>
                {t('button.edit')}
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <HiddenCard visible={!locked}>
          <FormContent>
            <EmailField name={registeredFormFields.email} label={t('form:label.email')} isRequired readOnly isHidden />
            <InputField name={registeredFormFields.first_name} label={t('form:label.firstName')} />
            <InputField name={registeredFormFields.last_name} label={t('form:label.lastName')} />
            <PasswordField name={registeredFormFields.password} label={t('form:label.newPassword')} />
            <PasswordField
              name={registeredFormFields.passwordConfirm}
              label={t('form:label.confirmPassword')}
              isHidden={!watchedPassword}
            />
          </FormContent>
          <ActionBar stackProps={{ sx: { mt: 3 } }}>
            <Button type="submit" variant="contained" color="primary">
              {t('button.update')}
            </Button>
            <Button variant="outlined" color="inherit" onClick={() => setLocked(true)}>
              {t('button.cancel')}
            </Button>
          </ActionBar>
        </HiddenCard>
      </FormContent>
    </ControlledForm>
  );
};

export default AccountForm;
