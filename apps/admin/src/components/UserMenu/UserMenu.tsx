import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useMenuItems } from '../../hooks';
import { IconButtonPlus } from '../Button';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const openHandler = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const closeHandler = () => setAnchorEl(null);

  const { userMenu: items } = useMenuItems();

  return (
    <>
      <IconButtonPlus
        id="user-menu-button"
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={openHandler}
        tooltip="User menu"
        color="inherit"
      >
        {open ? <CloseIcon color="inherit" /> : <AccountCircleIcon color="inherit" />}
      </IconButtonPlus>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeHandler}
        slotProps={{
          list: {
            'aria-labelledby': 'user-menu-button',
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

export default UserMenu;
