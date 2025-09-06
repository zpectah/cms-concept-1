import { useState, useEffect, SyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs, Tab } from '@mui/material';
import { getConfig } from '../../../utils';
import { profilePanelsKeys } from '../enums';
import { ProfilePanels } from '../types';

const PanelNavigation = () => {
  const [panelIndex, setPanelIndex] = useState(0);

  const { t } = useTranslation(['modules']);
  const { pathname } = useLocation();
  const {
    admin: { routes },
  } = getConfig();
  const navigate = useNavigate();

  const tabItems: { name: ProfilePanels; path: string; label: string }[] = [
    {
      name: profilePanelsKeys.account,
      path: `/${routes.profile.path}/${routes.profile.panels.account}`,
      label: t('modules:profile.tabs.account.title'),
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
