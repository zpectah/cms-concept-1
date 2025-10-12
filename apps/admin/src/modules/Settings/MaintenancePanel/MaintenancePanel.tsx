import { Button, Stack } from '@mui/material';
import { useMaintenancePanel } from './useMaintenancePanel';
import { Content, Section, Accordion } from '../../../components';

const MaintenancePanel = () => {
  const {} = useMaintenancePanel();

  // TODO

  return (
    <Content>
      <Section title="Údržba" cardContent>
        <Stack direction="column" gap={2}>
          <Stack direction="row" gap={1}>
            <Button variant="contained" color="primary">
              Analyze rows
            </Button>
            <Button variant="contained" color="error" disabled>
              Permanently delete analyzed rows
            </Button>
          </Stack>

          <Accordion
            gap={1}
            items={[
              {
                title: 'Articles',
                subtitle: '(0)',
                content: 'Panel content',
                actions: (
                  <>
                    <Button variant="outlined" color="error">
                      Smazat vše
                    </Button>
                  </>
                ),
                disabled: false,
              },
              {
                title: 'Attachments',
                subtitle: '(0)',
                content: 'Panel content',
                actions: (
                  <>
                    <Button variant="outlined" color="error">
                      Smazat vše
                    </Button>
                  </>
                ),
                disabled: false,
              },
              {
                title: 'Categories',
                subtitle: '(0)',
                content: 'Panel content',
                actions: (
                  <>
                    <Button variant="outlined" color="error">
                      Smazat vše
                    </Button>
                  </>
                ),
                disabled: false,
              },
              {
                title: 'Members',
                subtitle: '(0)',
                content: 'Panel content',
                actions: (
                  <>
                    <Button variant="outlined" color="error">
                      Smazat vše
                    </Button>
                  </>
                ),
                disabled: false,
              },
              {
                title: 'Menu',
                subtitle: '(0)',
                content: 'Panel content',
                actions: (
                  <>
                    <Button variant="outlined" color="error">
                      Smazat vše
                    </Button>
                  </>
                ),
                disabled: false,
              },
              {
                title: 'Pages',
                subtitle: '(0)',
                content: 'Panel content',
                actions: (
                  <>
                    <Button variant="outlined" color="error">
                      Smazat vše
                    </Button>
                  </>
                ),
                disabled: false,
              },
              {
                title: 'Tags',
                subtitle: '(0)',
                content: 'Panel content',
                actions: (
                  <>
                    <Button variant="outlined" color="error">
                      Smazat vše
                    </Button>
                  </>
                ),
                disabled: false,
              },
              {
                title: 'Translations',
                subtitle: '(0)',
                content: 'Panel content',
                actions: (
                  <>
                    <Button variant="outlined" color="error">
                      Smazat vše
                    </Button>
                  </>
                ),
                disabled: false,
              },
              {
                title: 'Users',
                subtitle: '(0)',
                content: 'Panel content',
                actions: (
                  <>
                    <Button variant="outlined" color="error">
                      Smazat vše
                    </Button>
                  </>
                ),
                disabled: false,
              },
            ]}
          />
        </Stack>
      </Section>
    </Content>
  );
};

export default MaintenancePanel;
