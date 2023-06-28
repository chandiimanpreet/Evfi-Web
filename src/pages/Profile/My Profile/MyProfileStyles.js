import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  personalInfo: {
    display: "flex",
    flexDirection: "column",
    rowGap: "18px",
    backgroundColor: "#ffffff",
    padding: "16px",
    marginBottom: "16px",
    height: "200px",
    width: "800px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
  },
  
  addressInfo: {
    display: "flex",
    flexDirection: "column",
    rowGap: "18px",
    backgroundColor: "#ffffff",
    padding: "16px",
    marginBottom: "16px",
    height: "200px",
    width: "800px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
  },



  information: {
    display: "flex", 
    flexDirection: "column",
    rowGap: "15px",
    paddingTop: "10px",
  },
  editButton: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "#282828!important",
    color: "yellow",
    borderRadius: "50px",
    padding: "10px 30px",
    width: "fit-content",
    alignSelf: "center",
  },

});

export default useStyles;
