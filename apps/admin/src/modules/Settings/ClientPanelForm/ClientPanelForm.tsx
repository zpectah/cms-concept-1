import { Button, Divider, Stack } from '@mui/material';
import { ControlledForm, Content, Section, SubmitButton } from '../../../components';
import { useClientPanelForm } from './useClientPanelForm';

const ClientPanelForm = () => {
  const { form } = useClientPanelForm();

  // TODO

  return (
    <ControlledForm form={form}>
      <Content>
        <Section title="Meta">
          - titulek
          <br />
          - popisek
          <br />
          - klíčová slova
          <br />- roboti
        </Section>
        <Section title="Stavy">
          - debug mód
          <br />- mód údržby
        </Section>
        <Section title="Zprávy">- odesílatel zpráv (?) - příjemci zpráv</Section>
        <Section title="Komentáře">
          - aktivní komentáře
          <br />- anonymní komentáře
        </Section>
        <Section title="Members">
          - aktivní - - - bude v configu!
          <br />
          - přihlášení
          <br />
          - obnova ztraceného hesla
          <br />
          - profilová stránka
          <br />- registrace uživatele
        </Section>
        <Divider />
        <Stack direction="row" gap={2}>
          <SubmitButton>Save changes</SubmitButton>
          <Button type="reset" variant="outlined" color="inherit">
            Reset
          </Button>
        </Stack>
      </Content>
    </ControlledForm>
  );
};

export default ClientPanelForm;
