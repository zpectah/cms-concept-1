import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useMenuItems } from '../../hooks';

const MainMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const openHandler = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const closeHandler = () => setAnchorEl(null);

  const { mainMenu: items } = useMenuItems();

  return (
    <>
      <Tooltip title={'Main menu'}>
        <IconButton
          id="main-menu-button"
          aria-controls={open ? 'main-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={openHandler}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Tooltip>
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
