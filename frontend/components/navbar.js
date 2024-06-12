import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Completed', 'All chores'];
const settings = ['Profile', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    console.log("Closing user menu")
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    console.log("Viewing Profile")
  }

  const handleLogout = () => {
    console.log("Logged out")
  }

  const chooseMethod = (setting) => {
    switch(setting) {
      case "Profile": return handleProfile
      case "Logout": return handleLogout
      default: handleCloseUserMenu
    }
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", height: '80px' }}> {/* Increase height to 80px */}
  <Container maxWidth="xl" sx={{ height: '100%' }}> {/* Make the container fill the height */}
    <Toolbar disableGutters sx={{ height: '100%', alignItems: 'center' }}> {/* Make the toolbar fill the height and vertically center its contents */}
      <a href="/">
      <img src="/chores.png" alt="Chores Logo" style={{ display: { xs: 'flex', md: 'none' }, width: '25px', height: 'auto', marginRight: "15px" }} />
      </a>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'sans-serif',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'green',
          textDecoration: 'none',
        }}
      >
        Chores
      </Typography>

      {pages.map((page) => (
        <Button
          key={page}
          onClick={handleCloseNavMenu}
          sx={{ mx: 1, color: 'green', fontFamily: "calibri", textTransform: "none", fontSize: 'inherit' }}
          component="a" href={`/${page.toLowerCase().replace(' ', '-')}`}
        >
          {page}
        </Button>
      ))}

      <Box sx={{ flexGrow: 1 }} />

      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={chooseMethod(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Toolbar>
  </Container>
</AppBar>

  );
}

export default Navbar;
