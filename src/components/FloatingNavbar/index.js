import { NavLink } from "react-router-dom";
import { BottomNavigation, Tooltip } from "@mui/material";
import { Restore, Favorite, LocationOn, AccountCircle,Home } from "@mui/icons-material";
import { useStyles } from "./style";



const FloatingNavbar = ({setDirection}) => {
  const classes = useStyles();

  const styles = ({ isActive }) => {
    return { color: isActive ? "yellow" : "white" }
  }

  return (
    <BottomNavigation
      showLabels={false}
      className={classes.bottomNavigation}
    >
      <Tooltip title="Home" placement="top" arrow><NavLink style={styles} onClick={()=>setDirection(1)} to='/'><Home sx={{mx:4}}/></NavLink></Tooltip>
      <Tooltip title="History" placement="top" arrow><NavLink style={styles} onClick={()=>setDirection(2)} to='/previousBooking'><Restore sx={{mx:4}}/></NavLink></Tooltip>
      <Tooltip title="Favourite" placement="top" arrow><NavLink style={styles} onClick={()=>setDirection(3)} to='/about'><Favorite sx={{mx:4}}/></NavLink></Tooltip>
      <Tooltip title="Nearby" placement="top" arrow><NavLink  style={styles} onClick={()=>setDirection(4)} to='/location'><LocationOn sx={{mx:4}}/></NavLink></Tooltip>
      <Tooltip title="Profile" placement="top" arrow><NavLink  style={styles} onClick={()=>setDirection(5)} to='/profile'><AccountCircle sx={{mx:4}}/></NavLink></Tooltip>
    </BottomNavigation>
  );
}

export default FloatingNavbar;