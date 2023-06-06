import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  navigation: {
    backgroundColor: "#282828!important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10rem",
    top: "5px !important",
    width: "46vw!important",
    left: "calc(50% - 23vw)!important",
    zIndex: 1500,

  },
  boltIcon: {
    color: "yellow",
    fontSize: "2.5rem!important",
    border: "2px solid yellow",
    borderRadius: "100%",
    marginLeft: "0.8rem",
  },
  popDesign: {
    '& label.Mui-focused': {
      color: '#fff',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#fff',
    },
    '& ..MuiInputLabel-root': {
      color: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fff',
      },
      '&:hover fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#fff',
      },
    },
  },
});
