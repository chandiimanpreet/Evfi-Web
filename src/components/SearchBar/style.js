import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  rdNavigation: {
    backgroundColor: "#282828!important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //borderRadius: "10rem",
    //top: "2.5rem !important",
    //width: "46vw!important",
    //left: "calc(50% - 23vw)!important",
  },
  searchNavigation: {
    backgroundColor: "#282828!important",
    display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: "10rem",
    top: "2.5rem !important",
    // width: "46vw!important",
    // left: "calc(50% - 23vw)!important",
  },
  searchboltIcon: {
    color: "yellow",
    //fontSize: "2.5rem!important",
    border: "2px solid yellow",
    borderRadius: "100%",
    position: "absolute",
    left: "1rem",
  },
  toolbarstyle: {
    display: "flex",
    flexDirection: "row",
    padding: "0.1rem",
  },
  newtoolbarstyle: {
    display: "flex",
    //flexDirection: 'row',
    padding: "0.1rem",
    width: "95%",
  },

  inputBtns: {
    backgroundColor: "#ffffff26!important",
    color: "#fff!important",
    //borderRadius: '10rem!important',
    fontSize: "16px!important",
    textTransform: "none!important",
    padding: "0.5rem 1.5rem!important",
    //width: "calc(50% - 3.5rem)!important",
    //width:"100%",
    cursor: "text!important",
    display: "flex",
    justifyContent: "left!important",
  },

  boltIcon: {
    color: "yellow",
    //fontSize: "2.5rem!important",
    border: "2px solid yellow",
    borderRadius: "100%",
    //margin:'0 1rem'
  },
  arrowBackIcon: {
    color: "yellow",
    //fontSize: "3rem!important",
    //border: "3px solid black",
    borderRadius: "100%",
    position: "absolute",
    //right: "-5rem",
    cursor: "pointer",
  },
  extendnavigationroot: {
    //width: "85vw!important",
    position: "relative",
    backgroundColor: "#282828!important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //borderRadius: "10rem",
    zIndex: 1500,
    //top:"10rem!important"
    //left: "0.3 rem !important"
  },

  bigboltIconRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: "2rem",
    right: "5rem",
  },

  bigboltIcon: {
    //top: '-2.3rem',
    color: "yellow",
    //border: '4px solid yellow',
    position: "absolute",
    //fontSize: '2.3rem!important',
    borderRadius: "100%",
    //left: '6rem',
    zIndex: 1500,
  },
  directionsIcon: {
    color: "yellow",
    border: "2px solid yellow",
    position: "sticky",
    //fontSize: '2.5rem!important',
    borderRadius: "100%",
    zIndex: 1500,
    cursor: "pointer",
    marginRight: "1rem",
    // left: '40rem',
  },
  extendinputroot: {
    position: "relative",
    display: "flex!important",
    justifyContent: "space-around!important",
    width: "100%!important",
    padding: "0.1rem!important",
    alignItems: "center",
    left: "-0.3rem!important",
  },

  searchPlaceAutoComplete: {
    width: "93%",
    border: "none",
    cursor: "pointer",
    //padding: ' 0.5rem 0.5rem ',
    position: "sticky",
    paddingLeft: "4.5rem",
    //left: '0.5rem'
  },

  autocompletestyle: {
    //width: '33vw',
    border: "none",
    cursor: "pointer",
    //padding: ' 0.5rem 0.5rem ',
    //position: 'relative',
  },

  swapHorizontalCircleIcon: {
    color: "#fff",
    cursor: "pointer",
    //marginRight: '5px',
    //marginLeft: '31px',
    //marginTop: '0px',
    //fontSize: '2.5rem!important'
  },

  travelExploreRoundedIcon: {
    fontSize: "2.3rem",
    color: "yellow",
    border: "2px solid yellow",
    borderRadius: "100%",
    position: "relative",
    right: "4rem",
    cursor: "pointer",
  },

  filterdesign: {
    fontSize: "2.3rem",
    position: "relative",
    right: "3.5rem",
    color: "white",
    cursor: "pointer",
    zIndex: 1500,
  },

  myLocationIcon: {
    //fontSize: '2rem',
    //position: 'relative',
    color: "white",
    cursor: "pointer",
    zIndex: 1500,
    //left: '4.0rem',
  },

  exNavPopover: {
    "& .MuiPopover-paper": {
      display: "flex!important",
      position: "relative!important",
      maxWidth: "calc(100% - 0px)!important",
      background: "none!important",
      boxShadow: "none!important",
      marginTop: "1rem!important",
      overflowX: "unset!important",
      overflowY: "unset!important",
      alignItems: "center!important",
      borderRadius: "30px!important",
      justifyContent: "center!important",
    },
  },

  popDesign: {
    "& label.Mui-focused": {
      color: "#fff",
    },

    "& .MuiInput-underline:after": {
      borderBottomColor: "#fff",
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
      left: "0.8rem",
      fontSize: "1.1rem",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        color: "#fff",
        backgroundColor: "#ffffff26!important",
        border: "none",
        cursor: "pointer",
        borderRadius: "2rem",
      },

      // '@media (max-width: 768px)': {
      // 	.css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root: {
      // 	  font-size: 0.8rem; /* Adjust the font size for smaller screens */
      // 	  width: 100%; /* Make it full-width on smaller screens */
      // 	  /* Add other responsive styles as needed */
      // 	}
      //   },
      "&:hover fieldset": {
        color: "#fff",
        backgroundColor: "#ffffff26!important",
        height: "3.7rem",
        border: "none",
        cursor: "pointer",
      },
      "&.Mui-focused fieldset": {
        backgroundColor: "#ffffff26!important",
        color: "#fff",
        border: "none",
        cursor: "pointer",
      },
      "& .MuiAutocomplete-input": {
        color: "white",
      },
    },
  },

  "@media (max-width: 600px)": {
    searchNavigation: {
      top: "1rem !important",
    },
    popDesign: {
      "&  .MuiOutlinedInput-root": {
        height: "3rem!important",
      },


      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          //right:"1rem",
          borderRadius: "10px",
          width: "91%",
          fontSize: "0.4rem",
          top: "0.1rem",
          // borderRadius: "10rem!important",
        },
      },
      searchPlaceAutoComplete: {
        "& .css-1i2h39m-MuiPaper-root-MuiAppBar-root": {
          width: "100%!important",
          left: "0!important",
          height: "3.5rem!important",
        },
        "& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-root .MuiOutlinedInput-root":
          {
            paddingRight: "100px !important",
            height: "2.5rem !important",
            right: "0.5rem !important",
          },
        "& .MuiOutlinedInput-root.MuiAutocomplete-input": {
          padding: "1.5px 4px 7.5px 5px!important",
        },
      },
      // "& .MuiOutlinedInput-root": {
      //   "& MuiAutocomplete-input": {
      //     padding: "1.5px 4px 7.5px 5px!important",
      //   },
      // },

      //.MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon.css-ejyr7l-MuiAutocomplete-root
      //   '&:hover fieldset': {
      // 	color: '#fff',
      // 	backgroundColor: '#ffffff26!important',
      // 	height:"2rem",
      // 	border: 'none',
      // 	cursor: 'pointer'
      // },
    },
  },
});
