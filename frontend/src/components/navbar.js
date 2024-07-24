import {useState, useEffect} from 'react';
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
import { useLogout } from '@/hooks/useLogout';
import { useAuthContext } from '@/hooks/useAuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router'

// const pages = ['Completed', 'All chores'];
// const settings = ['Profile', 'Logout'];

function Navbar() {
  const router = useRouter()
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {logout} = useLogout()
  const {user, loading, dispatch: userDispatch} = useAuthContext()
  const [admin, setAdmin] = useState(false)
  const [pages, setPages] = useState(["Completed", "All Chores"])
  const [settings, setSettings] = useState(["Profile", "Logout"])

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
    router.push("/profile")
    console.log("Viewing Profile")
    handleCloseUserMenu()
  }

  const handleLogout = () => {
    logout()
    console.log("Logged out")
    handleCloseUserMenu()
  }

  const chooseMethod = (setting) => {
    switch(setting) {
      case "Profile": return handleProfile
      case "Logout": return handleLogout
      default: handleCloseUserMenu
    }    
  }

  useEffect(() => {
    if((!loading && user) && (user.role === "Admin" || user.role === "User" || user.role === "Owner") ) {
      setAdmin(true)
      setPages(["Completed", "All Chores", "Family", "Assign"])
    } else {
      setPages(["Completed", "All Chores", "Family"])
      setAdmin(false)
    }
    setAnchorElUser(null) //this fixes a bug i had where the userMenu would open whenever i logged in
  },[user, loading, setAdmin])

  return (
    <AppBar position="static" sx={{ backgroundColor: "#81a651", height: '80px' }}> {/* Increase height to 80px */}
      <Container maxWidth="xl" sx={{ height: '100%' }}> {/* Make the container fill the height */}
        <Toolbar disableGutters sx={{ height: '100%', alignItems: 'center' }}> {/* Make the toolbar fill the height and vertically center its contents */}
          <Link href="/" passHref>
            <img src="/chores.png" alt="Chores Logo" style={{ display: { xs: 'flex', md: 'none' }, width: '25px', height: 'auto', marginRight: "15px" }} />
          </Link>

          <Link href="/" passHref>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: 'sans-serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#f5f5d5',
              textDecoration: 'none',
            }}
          >
            Obligoat
          </Typography>
          </Link>

          {pages.map((page) => (
             <Link key={page} href={`/${page.toLowerCase().replace(' ', '-')}`} passHref>
             <Button
              onClick={handleCloseNavMenu}
              sx={{ display: {xs: "none", md: "flex"}, mx: 1, color: '#f5f5d5', fontFamily: "calibri", textTransform: "none", fontSize: 'inherit' }}
            >
              {page}
            </Button>
            </Link>
          ))}

          <Box sx={{ flexGrow: 1 }} /> {/* This takes up max space to the left of the components after it */}

          {/* Menu Icon Button */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
            onClick={handleOpenNavMenu}
          >
            <MenuIcon sx={{ color: '#f5f5d5' }} />
          </IconButton>

          {/* Dropdown Menu for the Menu Icon */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page) => (
              <Link key={page} href={`/${page.toLowerCase().replace(' ', '-')}`} passHref>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
              </Link>
            ))}
          </Menu>
          {(!loading && user) && (<>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user.username.charAt(0).toUpperCase()} src="/static/images/avatar/2.jpg" sx={{backgroundColor: "#f9ffe9", color: '#9e8772'}}/>
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
          </Menu> </>)}
        </Toolbar>
    </Container>
  </AppBar>

  );
}

export default Navbar;
