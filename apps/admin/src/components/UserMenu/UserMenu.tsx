import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const openHandler = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const closeHandler = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title={'User menu'}>
        <IconButton
          id="user-menu-button"
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={openHandler}
        >
          {open ? <CloseIcon /> : <AccountCircleIcon />}
        </IconButton>
      </Tooltip>
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
        <MenuItem component={Link} to={'/profile'} onClick={closeHandler}>
          Profile
        </MenuItem>
        <MenuItem component={Link} to={'/login'} onClick={closeHandler}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
