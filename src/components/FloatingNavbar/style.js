import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  bottomNavigation: {
    position: "fixed",
    zIndex: 1100,
    right: "50%",
    transform: "translateX(50%)",
    width: "35vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    bottom: "2.5rem",
    bottom: "0!important",
    background: "#282828!important",
    top: "80%",
  },
});
