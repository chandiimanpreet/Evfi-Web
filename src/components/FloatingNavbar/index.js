import { useState } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./style";
import { BottomNavigation, BottomNavigationAction, Box, Tooltip, Avatar, Menu, MenuItem, Typography, IconButton, } from "@mui/material";
import { Restore, Favorite, LocationOn } from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';



const FloatingNavbar = () => {
  const classes = useStyles();

  const [value, setValue] = useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <BottomNavigation
      className={classes.bottomNavigation}
      value={value}
      onChange={handleChange}
    >
      
      <Link to="/">
        <Tooltip title="Home" placement="top" arrow>
          <BottomNavigationAction
            className={classes.bottomNavigationAction}
            label="Home"
            value="Home"
            icon={<HomeIcon />}
          />
        </Tooltip>
      </Link>
      
      <Link to="/previousBooking">
        <Tooltip title="Pevious Booking" placement="top" arrow>
          <BottomNavigationAction
            className={classes.bottomNavigationAction}
            label="Recents"
            value="recents"
            icon={<Restore />}
          />
        </Tooltip>
      </Link>

      <Link to="/about">
        <Tooltip title="Profile" placement="top" arrow>
          <BottomNavigationAction
            className={classes.bottomNavigationAction}
            label="Favorites"
            value="favorites"
            icon={<Favorite />}
          />
        </Tooltip>
      </Link>

      <Link to="/location">
        <Tooltip title="Profile" placement="top" arrow>
          <BottomNavigationAction
            className={classes.bottomNavigationAction}
            label="Nearby"
            value="nearby"
            icon={<LocationOn />}
          />
        </Tooltip>
      </Link>

      <Link to="/account">
        <Tooltip title="Profile" placement="top" arrow>
          <BottomNavigationAction
            label="Folder"
            value="folder"
          />
        </Tooltip>

        <Box sx={{ flexGrow: 0, marginBottom: '1.8rem', marginLeft: '.7rem', }}>
          <Tooltip title="Account" placement="top" arrow>
            <IconButton onClick={handleOpenUserMenu} >
              <Avatar alt="Remy Sharp" src="https://unsplash.com/photos/C8Ta0gwPbQg" sx={{ width: '29px', height: '30px', }} />
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Link>
    </BottomNavigation>
  );
}

export default FloatingNavbar;