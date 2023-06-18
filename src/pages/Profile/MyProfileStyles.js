import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  personalInfo: {
    backgroundColor: "#ffffff",
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "20px",
    height: "200px",
    width: "800px",
    border: "2px solid #000000",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 1)",
  },
  
  addressInfo: {
    backgroundColor: "#ffffff",
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "20px",
    height: "200px",
    width: "800px",
    border: "2px solid #000000",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 1)",
  },
  table: {
    width: "100%",
    marginTop: "16px",
  },
  tableHeader: {
    fontWeight: "bold",
    textAlign: "left",
  },
  tableCell: {
    paddingTop: "4px",
    paddingBottom: "25px",
    border: "10px",
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
  tableRow: {
    "&:not(:last-child)": {
      marginBottom: "12px",
    },
  },
});

export default useStyles;
