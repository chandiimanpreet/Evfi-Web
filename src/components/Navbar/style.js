import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  bottomNavigation: {
    position: "fixed",
    zIndex: 1100,
    right: "50%",
    transform: "translateX(50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#282828!important",
  },
  bottomNavigationAction: {
    color: "#bbb!important",
  },
});
