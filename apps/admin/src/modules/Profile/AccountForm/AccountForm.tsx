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
  Image,
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
            <Stack alignItems="center" justifyContent="center">
              {locked ? (
                <Image src={avatarImage} type="local-avatar" alt={userData?.user?.email} size={150} />
              ) : (
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
              )}
            </Stack>
          </Grid>
          <Grid size={8}>
            <Stack
              direction="column"
              alignItems={locked ? 'start' : 'initial'}
              justifyContent="center"
              gap={1}
              sx={{ width: '100%', height: '100%' }}
            >
              {locked ? (
                <>
                  <Literal label={t('form:label.email')} value={userData?.user?.email} />
                  <Literal
                    label={t('form:label.fullName')}
                    value={`${userData?.user?.first_name} ${userData?.user?.last_name}`}
                  />

                  <Button size="small" variant="outlined" color="inherit" onClick={() => setLocked(!locked)}>
                    {t('button.edit')}
                  </Button>
                </>
              ) : (
                <>
                  <EmailField
                    name={registeredFormFields.email}
                    label={t('form:label.email')}
                    isRequired
                    readOnly
                    isHidden
                  />
                  <InputField name={registeredFormFields.first_name} label={t('form:label.firstName')} />
                  <InputField name={registeredFormFields.last_name} label={t('form:label.lastName')} />
                  <PasswordField name={registeredFormFields.password} label={t('form:label.newPassword')} />
                  <PasswordField
                    name={registeredFormFields.passwordConfirm}
                    label={t('form:label.confirmPassword')}
                    isHidden={!watchedPassword}
                  />
                </>
              )}
            </Stack>
          </Grid>
        </Grid>

        {!locked && (
          <ActionBar stackProps={{ sx: { mt: 3 } }}>
            <Button type="submit" variant="contained" color="primary">
              {t('button.update')}
            </Button>
            <Button variant="outlined" color="inherit" onClick={() => setLocked(true)}>
              {t('button.cancel')}
            </Button>
          </ActionBar>
        )}
      </FormContent>
    </ControlledForm>
  );
};

export default AccountForm;
