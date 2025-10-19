import { Button, Divider, Stack, Typography } from '@mui/material';
import { Section } from '../../../../components';
import { useMaintenanceForm } from './useMaintenanceForm';

const MaintenanceForm = () => {
  const { onAnalyze, onProceed, analyzedResults } = useMaintenanceForm();

  return (
    <Section title="Údržba" cardContent>
      <Stack direction="column" gap={2}>
        <Stack direction="row" gap={1}>
          <Button variant="contained" color="primary" onClick={onAnalyze}>
            Analyzovat řádky
          </Button>
        </Stack>

        {!!analyzedResults && (
          <>
            <Divider />
            <Stack direction="column" gap={2}>
              {analyzedResults.articles.length > 0 && (
                <Stack direction="row" gap={2} alignItems="center">
                  Articles:
                  <Stack direction="row" gap={0.5}>
                    {analyzedResults.articles.map((item) => (
                      <Typography key={`article_${item}`}>{item}</Typography>
                    ))}
                  </Stack>
                </Stack>
              )}
              {analyzedResults.attachments.length > 0 && (
                <Stack direction="row" gap={2}>
                  Attachments:
                  <Stack direction="row" gap={1}>
                    {analyzedResults.attachments.map((item) => (
                      <Typography key={`attachments_${item}`}>{item}</Typography>
                    ))}
                  </Stack>
                </Stack>
              )}
              {analyzedResults.categories.length > 0 && (
                <Stack direction="row" gap={2}>
                  Categories:
                  <Stack direction="row" gap={1}>
                    {analyzedResults.categories.map((item) => (
                      <Typography key={`categories_${item}`}>{item}</Typography>
                    ))}
                  </Stack>
                </Stack>
              )}
              {analyzedResults.members.length > 0 && (
                <Stack direction="row" gap={2}>
                  Members:
                  <Stack direction="row" gap={1}>
                    {analyzedResults.members.map((item) => (
                      <Typography key={`members_${item}`}>{item}</Typography>
                    ))}
                  </Stack>
                </Stack>
              )}
              {analyzedResults.menu.length > 0 && (
                <Stack direction="row" gap={2}>
                  Menu:
                  <Stack direction="row" gap={1}>
                    {analyzedResults.menu.map((item) => (
                      <Typography key={`menu_${item}`}>{item}</Typography>
                    ))}
                  </Stack>
                </Stack>
              )}
              {analyzedResults.menuItems.length > 0 && (
                <Stack direction="row" gap={2}>
                  Menu items:
                  <Stack direction="row" gap={1}>
                    {analyzedResults.menuItems.map((item) => (
                      <Typography key={`menuItems_${item}`}>{item}</Typography>
                    ))}
                  </Stack>
                </Stack>
              )}
              {analyzedResults.pages.length > 0 && (
                <Stack direction="row" gap={2}>
                  Pages:
                  <Stack direction="row" gap={1}>
                    {analyzedResults.pages.map((item) => (
                      <Typography key={`pages_${item}`}>{item}</Typography>
                    ))}
                  </Stack>
                </Stack>
              )}
              {analyzedResults.tags.length > 0 && (
                <Stack direction="row" gap={2}>
                  Tags:
                  <Stack direction="row" gap={1}>
                    {analyzedResults.tags.map((item) => (
                      <Typography key={`tags_${item}`}>{item}</Typography>
                    ))}
                  </Stack>
                </Stack>
              )}
              {analyzedResults.translations.length > 0 && (
                <Stack direction="row" gap={2}>
                  Translations:
                  <Stack direction="row" gap={1}>
                    {analyzedResults.translations.map((item) => (
                      <Typography key={`translations_${item}`}>{item}</Typography>
                    ))}
                  </Stack>
                </Stack>
              )}
              {analyzedResults.users.length > 0 && (
                <Stack direction="row" gap={2}>
                  Users:
                  <Stack direction="row" gap={1}>
                    {analyzedResults.users.map((item) => (
                      <Typography key={`users_${item}`}>{item}</Typography>
                    ))}
                  </Stack>
                </Stack>
              )}
            </Stack>
            <Divider />
          </>
        )}

        <Stack direction="row" gap={1}>
          <Button variant="outlined" color="error" onClick={onProceed} disabled={!analyzedResults}>
            Permanentně smazat všechny analyzované řádky
          </Button>
        </Stack>
      </Stack>
    </Section>
  );
};

export default MaintenanceForm;
