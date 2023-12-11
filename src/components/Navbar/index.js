import { NavLink } from "react-router-dom";
import { BottomNavigation, Tooltip } from "@mui/material";
import { Restore, AccountCircle, Home, EvStation } from "@mui/icons-material";
import { useStyles } from "./style";

const Navbar = ({ moveToPageIndex }) => {
	const classes = useStyles();

	const styles = ({ isActive }) => {
		return { color: isActive ? "yellow" : "white" }
	}

	return (
		<BottomNavigation showLabels={false} className={classes.bottomNavigation}
			sx={{
				gap: { xs: '3.5rem', md: '5rem', lg: '6rem' },
				bottom: { xs: '0', md: '2.5rem' },
				width: { xs: '100vw', md: 'fit-content' },
				borderRadius: { xs: '0', md: '10px' },
				padding: { xs: '0', md: '0 1.5rem' },
			}}>

			<Tooltip title="Home" placement="top" arrow>
				<NavLink style={styles} onClick={() => moveToPageIndex(0)} to='/'>
					<Home />
				</NavLink>
			</Tooltip>
			<Tooltip title="History" placement="top" arrow>
				<NavLink style={styles} onClick={() => moveToPageIndex(1)} to='/previousBooking'>
					<Restore />
				</NavLink>
			</Tooltip>
			<Tooltip title="Chargers List" placement="top" arrow>
				<NavLink style={styles} onClick={() => moveToPageIndex(2)} to='/requests'>
					<EvStation sx={{ mx: 4 }} />
				</NavLink>
			</Tooltip>
			<Tooltip title="Profile" placement="top" arrow>
				<NavLink style={styles} onClick={() => moveToPageIndex(3)} to='/profile'>
					<AccountCircle />
				</NavLink>
			</Tooltip>
		</BottomNavigation>
	);
}

export default Navbar;