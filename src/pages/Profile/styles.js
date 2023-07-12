import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "50px 0px 0px 100px",
        height: "100vh",
        backgroundColor: "#000",
        backgroundImage:
            "radial-gradient(circle at 6% 100%, #e2b714, transparent 30%), radial-gradient(circle at 90% -9%, #e2b714, transparent 30%)",
    },
    container: {
        display: "flex",
        flexDirection: "row",
        columnGap: "120px",
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
        marginTop: "58px",
        borderRadius: "10px",
        backdropFilter: "blur(10px)",
        backgroundColor: " rgba(200, 200, 200, 0.2)",
    },
    sidebox: {
        width: "230px",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        paddingLeft: "20px",
    },
    buttonGroup: {
        color: "white",
    },
    button: {
        height: "4rem",
    },
    buttonName: {
        marginLeft: "25px",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        fontFamily: 'Manrope !important',
        fontWeight: '500',
        cursor: 'pointer',
    },
    activeButton: {
        backgroundColor: "#181818!important",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
    },
    profilePictureContainer: {
        borderRadius: "10px",
        backdropFilter: "blur(10px)",
        backgroundColor: " rgba(200, 200, 200, 0.2)",
    },
    profileGreet: {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "row",
        padding: "8px",
    },
    profilePicture: {
        margin: "2px",
        width: "100px",
        height: "100px",
    },
    greet: {
        justifyContent: "center",
        paddingTop: "20px",
    },
    hello: {
        fontSize: "15px",
        fontFamily: 'Manrope !important',
        paddingLeft: "20px",
    },
    name: {
        fontWeight: "bold",
        fontSize: "17px",
        fontFamily: 'Manrope !important',
        paddingLeft: "20px",
        color: "white",
    },

});