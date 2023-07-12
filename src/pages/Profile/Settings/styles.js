import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        overflow: "auto",
        height: "635px",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
    },
    settingsCard: {
        width: "800px",
        padding: "20px",
        height: "fit-content",
        color: "white",
        borderRadius: "10px",
        backdropFilter: "blur(10px)",
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
        alignItems: "center",
    },
    platformName: {
        display: "flex",
        alignItems: "center",
        width: "120px",
    },
});

export default useStyles;
