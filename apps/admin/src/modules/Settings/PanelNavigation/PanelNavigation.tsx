import { useState, useEffect, SyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs, Tab } from '@mui/material';
import { getConfig } from '../../../utils';
import { settingsPanelsKeys } from '../enums';
import { SettingsPanels } from '../types';

const PanelNavigation = () => {
  const [panelIndex, setPanelIndex] = useState(0);

  const { t } = useTranslation(['modules']);
  const { pathname } = useLocation();
  const {
    admin: { routes },
  } = getConfig();
  const navigate = useNavigate();

  const tabItems: { name: SettingsPanels; path: string; label: string }[] = [
    {
      name: settingsPanelsKeys.global,
      path: `/${routes.settings.path}/${routes.settings.panels.global}`,
      label: t('modules:settings.tabs.global.title'),
    },
    {
      name: settingsPanelsKeys.client,
      path: `/${routes.settings.path}/${routes.settings.panels.client}`,
      label: t('modules:settings.tabs.client.title'),
    },
    {
      name: settingsPanelsKeys.languages,
      path: `/${routes.settings.path}/${routes.settings.panels.languages}`,
      label: t('modules:settings.tabs.language.title'),
    },
    {
      name: settingsPanelsKeys.maintenance,
      path: `/${routes.settings.path}/${routes.settings.panels.maintenance}`,
      label: t('modules:settings.tabs.maintenance.title'),
    },
    {
      name: settingsPanelsKeys.blacklist,
      path: `/${routes.settings.path}/${routes.settings.panels.blacklist}`,
      label: t('modules:settings.tabs.blacklist.title'),
    },
  ];

  const changePanelHandler = (event: SyntheticEvent, value: number) => {
    const panel = tabItems[value];
    const path = panel.path;

    navigate(path);
  };

  useEffect(() => {
    if (pathname) {
      const index = tabItems.findIndex((item) => item.path === pathname);

      if (index > -1) setPanelIndex(index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Tabs
      onChange={changePanelHandler}
      value={panelIndex}
      slotProps={{
        indicator: { style: { transition: 'none' } },
      }}
    >
      {tabItems.map(({ name, label }, index) => (
        <Tab key={name} label={label} />
      ))}
    </Tabs>
  );
};

export default PanelNavigation;
