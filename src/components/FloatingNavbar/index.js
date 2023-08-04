import { NavLink } from "react-router-dom";
import { BottomNavigation, Tooltip } from "@mui/material";
import { Restore, AccountCircle, Home, EvStation } from "@mui/icons-material";
import { useStyles } from "./style";

const FloatingNavbar = ({ moveToPageIndex }) => {
	const classes = useStyles();

	const styles = ({ isActive }) => {
		return { color: isActive ? "yellow" : "white" }
	}

	return (
		<BottomNavigation showLabels={false} className={classes.bottomNavigation}>
			<Tooltip title="Home" placement="top" arrow><NavLink style={styles}
				onClick={() => moveToPageIndex(0)} to='/'><Home sx={{ mx: 4 }} /></NavLink>
			</Tooltip>
			<Tooltip title="History" placement="top" arrow><NavLink style={styles}
				onClick={() => moveToPageIndex(1)} to='/previousBooking'><Restore sx={{ mx: 4 }} /></NavLink>
			</Tooltip>
			<Tooltip title="Booking Requests" placement="top" arrow><NavLink style={styles}
				onClick={() => moveToPageIndex(2)} to='/requests'> <EvStation sx={{ mx: 4 }} /> </NavLink>
			</Tooltip>
			<Tooltip title="Profile" placement="top" arrow><NavLink style={styles}
				onClick={() => moveToPageIndex(3)} to='/profile'><AccountCircle sx={{ mx: 4 }} /></NavLink>
			</Tooltip>
		</BottomNavigation>
	);
}

export default FloatingNavbar;