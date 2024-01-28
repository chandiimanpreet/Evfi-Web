import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
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
    container: {
        display: "flex",
        flexDirection: "column",
        rowGap: "0.8rem",
    },
    settingsCard: {
        margin: "0.5rem",
        padding: "1rem",
        height: "fit-content",
        color: "white",
        borderRadius: "0.625rem",
        backdropFilter: "blur(0.625rem)",
        backgroundColor: "rgba(200, 200, 200, 0.2)",
    },
    Button: {
        color: "white",
        fontWeight: '500',
    },
    connectButtonContainer: {
        display: "flex",
        justifyContent: "flex-start"
    },
    listItem: {
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: "0",
        paddingRight: "0",

    },
    platformName: {
        display: "flex",
        alignItems: "center",
    },
});

export default useStyles;