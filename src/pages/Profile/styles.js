import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "100vh",
    paddingLeft: "100px",
    paddingTop: "50px",
    backgroundColor: "#f1f3f6",
  },
  container: {

    display: "flex",
    flexDirection: "row",
  },
  boltIcon: {
    position: "fixed",
    top: "30px",
    right: "40px",
    backgroundColor: "#282828!important",
    color: "yellow",
    borderRadius: "100%",
    fontSize: "3rem!important",
  },
  outerBox: {
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: "50px",

  },
  sidebox: { 
    width: "230px",
    height: "600px",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "20px",
  },
  buttonGroup: {
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    fontSize: "15px",
    width: "100%",
  },
  button: {
    width: "100%",
    height: "4rem",
    fontSize: "18px",
  },
  buttonName: {
    marginLeft: "25px",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#f5faff",
    color: "#2874f0",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
  },
  tabContent: {
    marginTop: "-50px",
    paddingLeft: "120px",
  },
  information: {
    display: "flex",
    flexDirection: "column",
    borderColor: "grey",
    paddingLeft: "-20px",
    paddingTop: "50px",
  },
  profilePictureContainer: {
    backgroundColor: "#ffffff",
    width: "100%",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
  },
  profileGreet: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    padding: "8px",
  },
  profilePicture: {
    display: "flex",
    width: "100px",
    height: "100px",
  },
  greet: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: "20px",
  },
  hello: {
    fontSize: "15px",
    paddingLeft: "20px",
  },
  name: {
    fontWeight: "bold",
    fontSize: "17px",
    paddingLeft: "20px",
  }
});
