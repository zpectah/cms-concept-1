import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { registeredFormFields } from '../../enums';
import { Card } from '../Card';
import InputField from './InputField';

const AddressField = () => {
  const { t } = useTranslation(['form']);

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid size={8}>
          <InputField
            name={`${registeredFormFields.address}.${registeredFormFields.street}`}
            label={t('form:label.street')}
          />
        </Grid>
        <Grid size={4}>
          <InputField
            name={`${registeredFormFields.address}.${registeredFormFields.streetNo}`}
            label={t('form:label.streetNo')}
          />
        </Grid>
        <Grid size={9}>
          <InputField
            name={`${registeredFormFields.address}.${registeredFormFields.district}`}
            label={t('form:label.district')}
          />
        </Grid>
        <Grid size={3}>
          <InputField
            name={`${registeredFormFields.address}.${registeredFormFields.zip}`}
            label={t('form:label.zip')}
          />
        </Grid>
        <Grid size={6}>
          <InputField
            name={`${registeredFormFields.address}.${registeredFormFields.city}`}
            label={t('form:label.city')}
          />
        </Grid>
        <Grid size={6}>
          <InputField
            name={`${registeredFormFields.address}.${registeredFormFields.country}`}
            label={t('form:label.country')}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default AddressField;
