import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#000",
    backgroundImage:
      "radial-gradient(circle at 6% 100%, #e2b714, transparent 30%), radial-gradient(circle at 90% -9%, #e2b714, transparent 30%)",
  },
  main: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '&::-ms-overflow-style': 'none',
    '&::-scrollbar-width': 'none',
  },
  outerBox: {
    marginTop: "3.625rem",
    borderRadius: "0.625rem",
    backdropFilter: "blur(0.625rem)",
    backgroundColor: "rgba(200, 200, 200, 0.2)",
  },
  sidebox: {
    height: "37.5rem",
    flexDirection: "column",
  },
  buttonGroup: {
    color: "white",
  },
  buttonName: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "Manrope !important",
    fontWeight: "500",
    cursor: "pointer",
  },
  profilePictureContainer: {
    borderRadius: "12px",
    backdropFilter: "blur(0.625rem)",
    backgroundColor: "rgba(200, 200, 200, 0.2)",
  },
  profileGreet: {
    display: "flex",
    flexDirection: "row",
    padding: "0.5rem",
    justifyContent: 'flex-start',
  },
  profilePicture: {
    width: "5rem",
    height: "5rem",
    display: 'flex',
    position: 'relative',
    '&:hover': {
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    },
}
});