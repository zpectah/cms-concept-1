import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const MainMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const openHandler = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const closeHandler = () => setAnchorEl(null);

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
        <MenuItem component={Link} to={'/demo'} onClick={closeHandler}>
          Demo *
        </MenuItem>
        <MenuItem component={Link} to={'/login'} onClick={closeHandler}>
          Login *
        </MenuItem>
        <MenuItem component={Link} to={'/password-recovery'} onClick={closeHandler}>
          Password Recovery *
        </MenuItem>
        <MenuItem component={Link} to={'/dashboard'} onClick={closeHandler}>
          Dashboard
        </MenuItem>
        <MenuItem component={Link} to={'/articles'} onClick={closeHandler}>
          Articles
        </MenuItem>
        <MenuItem component={Link} to={'/categories'} onClick={closeHandler}>
          Categories
        </MenuItem>
        <MenuItem component={Link} to={'/tags'} onClick={closeHandler}>
          Tags
        </MenuItem>
        <MenuItem component={Link} to={'/attachments'} onClick={closeHandler}>
          Attachments
        </MenuItem>
        <MenuItem component={Link} to={'/profile'} onClick={closeHandler}>
          Profile
        </MenuItem>
        <MenuItem component={Link} to={'/settings'} onClick={closeHandler}>
          Settings
        </MenuItem>
      </Menu>
    </>
  );
};

export default MainMenu;
