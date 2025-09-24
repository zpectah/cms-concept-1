import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { registeredFormFields } from '../../enums';
import { Card } from '../Card';
import InputField from './InputField';

interface AddressFieldProps {
  fieldPrefix: string;
  disableCard?: boolean;
}

const AddressField = ({ fieldPrefix, disableCard }: AddressFieldProps) => {
  const { t } = useTranslation(['form']);

  const renderFields = () => (
    <Grid container spacing={2}>
      <Grid size={8}>
        <InputField name={`${fieldPrefix}.${registeredFormFields.street}`} label={t('form:label.street')} />
      </Grid>
      <Grid size={4}>
        <InputField name={`${fieldPrefix}.${registeredFormFields.streetNo}`} label={t('form:label.streetNo')} />
      </Grid>
      <Grid size={9}>
        <InputField name={`${fieldPrefix}.${registeredFormFields.district}`} label={t('form:label.district')} />
      </Grid>
      <Grid size={3}>
        <InputField name={`${fieldPrefix}.${registeredFormFields.zip}`} label={t('form:label.zip')} />
      </Grid>
      <Grid size={6}>
        <InputField name={`${fieldPrefix}.${registeredFormFields.city}`} label={t('form:label.city')} />
      </Grid>
      <Grid size={6}>
        <InputField name={`${fieldPrefix}.${registeredFormFields.country}`} label={t('form:label.country')} />
      </Grid>
    </Grid>
  );

  if (disableCard) {
    return renderFields();
  }

  return <Card>{renderFields()}</Card>;
};

export default AddressField;
