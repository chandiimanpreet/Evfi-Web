import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
	bottomNavigation: {
		position: "fixed",
		zIndex: 1100,
		right: "50%",
		transform: "translateX(50%)",
		display: "flex",
		padding:'0 1rem 0 1rem',
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "10px",
		background: "#282828!important",
	},
	bottomNavigationAction: {
		color: "#bbb!important",
	}
});
