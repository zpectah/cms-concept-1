import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useMenuItems } from '../../hooks';
import { IconButtonPlus } from '../Button';

const MainMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const openHandler = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const closeHandler = () => setAnchorEl(null);

  const { mainMenu: items } = useMenuItems();

  return (
    <>
      <IconButtonPlus
        id="main-menu-button"
        aria-controls={open ? 'main-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={openHandler}
        tooltip="Main menu"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButtonPlus>
      <Menu
        id="main-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeHandler}
        slotProps={{
          list: {
            'aria-labelledby': 'main-menu-button',
          },
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.id} component={Link} to={item.path} onClick={closeHandler}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MainMenu;
