import { useState } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./style";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
// import { RestoreIcon, FavoriteIcon, FolderIcon, LocationOnIcon } from "@mui/icons-material";
import { Folder, Restore, Favorite, LocationOn } from "@mui/icons-material";


const FloatingNavbar = () => {
  const classes = useStyles();

  const [value, setValue] = useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      className={classes.bottomNavigation}
      sx={{ backgroundcolor: "#fff" }}
      value={value}
      onChange={handleChange}
    >
      <Link to="/">
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<Restore />}
        />
      </Link>

      <Link to="/About">
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<Favorite />}
        />
      </Link>

      <Link to="/Location">
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<LocationOn />}
        />
      </Link>

      <Link to="/Profile">
        <BottomNavigationAction
          label="Folder"
          value="folder"
          icon={<Folder />}
        />
      </Link>
    </BottomNavigation>
  );
}

export default FloatingNavbar;