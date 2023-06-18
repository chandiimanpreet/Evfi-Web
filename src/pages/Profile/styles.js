import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  outerBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "100vh",
    paddingLeft: "100px",
    paddingTop: "100px",
  },
  
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "45px",
  },
  activeButton: {
    backgroundColor: "#0084e3",
    color: "#fff",
    borderRadius: "50px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
  },
  button: {
    backgroundColor: "#fff",
    color: "black",
    borderRadius: "50px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  tabContent: {
    marginTop: "-50px",
    paddingLeft: "120px",
  },
  information: {
    borderColor: "grey",
    position: "relative",
  },
  profilePictureContainer: {
    display: "flex",
    alignItems: "flex-start",
    position: "absolute",
    top: "30px",
    right: "30px",
  },
  profilePicture: {
    width: "100px",
    height: "100px",
  },
});
