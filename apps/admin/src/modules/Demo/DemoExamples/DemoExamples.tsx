import dayjs from 'dayjs';
import { Button, Stack, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  ControlledForm,
  FormFieldBase,
  Password,
  DatePickerField,
  DateTimePickerField,
  SwitchField,
  WysiwygField,
  InputField,
  CheckboxField,
  EmailField,
  NumberField,
  NumberAltField,
  PasswordField,
  RadioGroupField,
  SelectField,
  TextareaField,
  Textarea,
} from '../../../components';
import { useAppStore } from '../../../store';

const DemoExamples = () => {
  const form = useForm({
    defaultValues: {
      field_switch: true,
      field_datepicker: null,
      field_datetimepicker: dayjs('2025-06-25T22:00:00.000Z'),
      field_wysiwyg: 'gfhfdgh dfghdfghdfhdfg',
      field_input: '',
      field_checkbox: true,
      field_email: '',
      field_number: 225,
      field_number_alt: 10,
      field_password: '',
      field_password_alt: '',
      field_radiogroup: 'opt1',
      field_radiogroup2: 'opt2',
      field_select: 'opt2',
      field_textarea: '',
    },
  });
  const { addToast } = useAppStore();

  return (
    <ControlledForm form={form}>
      <Stack gap={4}>
        <Stack gap={4}>
          <Stack>
            <FormFieldBase
              name="fieldName1"
              label="Field label"
              isRequired
              helperMessages={['Primary helper message']}
              successMessages={['Primary success message']}
              errorMessages={['Primary error message']}
            >
              <Password fullWidth placeholder="Input placeholder text" />
            </FormFieldBase>
          </Stack>
          <Divider />
          <Stack gap={2}>
            <InputField name="field_input" label="InputField label" />
            <EmailField name="field_email" label="EmailField label" />
            <NumberField name="field_number" label="NumberField label" />
            <NumberAltField name="field_number_alt" label="NumberAltField label" fieldProps={{ step: 10 }} />
            <PasswordField name="field_password_alt" label="PasswordField label" />
            <TextareaField name="field_textarea" label="TextareaField label" />
            <WysiwygField name="field_wysiwyg" label="WysiwygField label" isRequired />
            <Divider />
            <DatePickerField name="field_datepicker" label="DatePickerField label" />
            <DateTimePickerField name="field_datetimepicker" label="DateTimePickerField label" />
            <Divider />
            <SwitchField name="field_switch" label="SwitchField label" fieldProps={{ label: 'Switch label' }} />
            <CheckboxField name="field_checkbox" label="CheckboxField label" fieldProps={{ label: 'Checkbox label' }} />
            <SelectField
              name="field_select"
              label="SelectField label"
              items={[
                {
                  value: 'opt1',
                  children: 'Option 1',
                },
                {
                  value: 'opt2',
                  children: 'Option 2',
                },
                {
                  value: 'opt3',
                  children: 'Option 3',
                },
                {
                  value: 'opt4',
                  children: 'Option 4',
                  disabled: true,
                },
              ]}
            />
            <RadioGroupField
              name="field_radiogroup"
              label="RadioGroupField horizontal label"
              items={[
                {
                  name: 'field_radiogroup.opt1',
                  value: 'opt1',
                  label: 'Yes',
                },
                {
                  name: 'field_radiogroup.opt2',
                  value: 'opt2',
                  label: 'No',
                },
                {
                  name: 'field_radiogroup.opt3',
                  value: 'opt3',
                  label: 'Maybe',
                },
              ]}
              row
            />
            <RadioGroupField
              name="field_radiogroup2"
              label="RadioGroupField vertical label"
              items={[
                {
                  name: 'field_radiogroup2.opt1',
                  value: 'opt1',
                  label: 'Option 1',
                },
                {
                  name: 'field_radiogroup2.opt2',
                  value: 'opt2',
                  label: 'Option 2',
                },
                {
                  name: 'field_radiogroup2.opt3',
                  value: 'opt3',
                  label: 'Option 3',
                },
                {
                  name: 'field_radiogroup2.opt4',
                  value: 'opt4',
                  label: 'Option 4',
                  disabled: true,
                },
              ]}
            />
          </Stack>
        </Stack>
        <Divider />
        <Stack direction="row" gap={2} flexWrap="wrap">
          <Button variant="outlined" onClick={() => addToast('Toast default title', 'info', true)}>
            Open toast
          </Button>
          <Button variant="outlined" onClick={() => addToast('Toast default title 2', 'info', 10000)}>
            Open toast (longer)
          </Button>
          <Button variant="outlined" color="success" onClick={() => addToast('Toast success title', 'success', true)}>
            Open success toast
          </Button>
          <Button variant="outlined" color="warning" onClick={() => addToast('Toast warning title', 'warning', true)}>
            Open warning toast
          </Button>
          <Button variant="outlined" color="error" onClick={() => addToast('Toast error title', 'error', true)}>
            Open error toast
          </Button>
        </Stack>
        <Divider />
        <Stack>
          <Textarea value={JSON.stringify(form.watch(), null, 2)} rows={17} readOnly />
        </Stack>
      </Stack>
    </ControlledForm>
  );
};

export default DemoExamples;
