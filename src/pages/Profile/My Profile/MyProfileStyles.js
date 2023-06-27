import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root:{
    marginLeft: "15px",
  },
  // content: {
  //   padding: "10px",
  // },
  personalInfo: {
    display: "flex",
    flexDirection: "column",
    rowGap: "18px",
    backgroundColor: "#ffffff",
    marginBottom: "16px",
    height: "200px",
    width: "800px",
    padding: "20px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
  },
  
  addressInfo: {
    display: "flex",
    flexDirection: "column",
    rowGap: "20px",
    backgroundColor: "#ffffff",
    padding: "18px",
    marginBottom: "16px",
    height: "200px",
    width: "800px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
  },
  information: {
    display: "flex", 
    flexDirection: "column",
    rowGap: "12px",
  },
  editButton: {
    marginLeft: "-15px",
    marginTop: "10px",
    display: "flex",
    padding: "10px 30px",
    width: "fit-content",
    alignSelf: "center",
  },
});

export default useStyles;
