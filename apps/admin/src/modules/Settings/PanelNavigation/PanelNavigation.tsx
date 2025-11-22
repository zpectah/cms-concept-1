import { useState, useEffect, SyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs, Tab } from '@mui/material';
import { getConfig } from '../../../config';
import { useUserActions } from '../../../hooks';
import { settingsPanelsKeys } from '../enums';
import { SettingsPanelTabs } from '../types';

const PanelNavigation = () => {
  const [panelIndex, setPanelIndex] = useState(0);

  const { t } = useTranslation(['modules']);
  const { settings } = useUserActions();
  const { pathname } = useLocation();
  const { routes } = getConfig();
  const navigate = useNavigate();

  const tabItems: SettingsPanelTabs[] = [
    {
      name: settingsPanelsKeys.global,
      path: `/${routes.settings.path}/${routes.settings.panels.global}`,
      label: t('modules:settings.tabs.global.title'),
      visible: settings.view && settings.global.view,
    },
    {
      name: settingsPanelsKeys.client,
      path: `/${routes.settings.path}/${routes.settings.panels.client}`,
      label: t('modules:settings.tabs.client.title'),
      visible: settings.view && settings.client.view,
    },
    {
      name: settingsPanelsKeys.languages,
      path: `/${routes.settings.path}/${routes.settings.panels.languages}`,
      label: t('modules:settings.tabs.language.title'),
      visible: settings.view && settings.languages.view,
    },
    {
      name: settingsPanelsKeys.blacklist,
      path: `/${routes.settings.path}/${routes.settings.panels.blacklist}`,
      label: t('modules:settings.tabs.blacklist.title'),
      visible: settings.view && settings.blacklist.view,
    },
    {
      name: settingsPanelsKeys.maintenance,
      path: `/${routes.settings.path}/${routes.settings.panels.maintenance}`,
      label: t('modules:settings.tabs.maintenance.title'),
      visible: settings.view && settings.maintenance.view,
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
      sx={({ palette }) => ({
        borderBottom: `1px solid ${palette.divider}`,
      })}
    >
      {tabItems.map(({ name, label, visible }, index) => visible && <Tab key={name} label={label} />)}
    </Tabs>
  );
};

export default PanelNavigation;
