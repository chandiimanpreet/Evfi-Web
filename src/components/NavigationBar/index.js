import { useStyles } from "./style";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  Tooltip,
  Avatar,
} from "@mui/material";
import {
  Adb as AdbIcon,
  Bolt as BoltIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";

import { useState } from "react";

// for searchbar

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const NavigationBar = () => {
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const classes = useStyles();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "#282828",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        right: "25%",
        top: "15%",
        borderRadius: "50px",
        width: "50%",
      }}
      className={classes.Navigaion}
    >
      <Container
        maxWidth="xl"
        sx={{ paddingLeft: "0px!important", paddingRight: "1rem!important" }}
      >
        <Toolbar disableGutters>
          <BoltIcon
            sx={{
              color: "yellow",
              fontSize: "2.5rem",
              border: "2px solid yellow",
              borderRadius: "100%",
              marginLeft: "0.8rem",
            }}
          />
          <Box sx={{ flexGrow: 1, borderRadius: "50px" }}>
            <Search sx={{ borderRadius: "50px" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Source"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Search sx={{ borderRadius: "50px" }}>
              <SearchIconWrapper></SearchIconWrapper>
              <StyledInputBase
                placeholder="Destination"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Box sx={{ flexGrow: 0, marginLeft: ".5rem" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavigationBar;
