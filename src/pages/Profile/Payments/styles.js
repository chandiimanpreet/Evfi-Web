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
    cardContainer: {
        width: '95%',
        display: "flex",
        flexDirection: "column",
        rowGap: "1.6rem",
    },
    paymentCard: {
        width: "95%",
        color: "white",
        fontFamily: 'Manrope !important',
        borderRadius: "0.625rem",
        backdropFilter: "blur(0.625rem)",
        backgroundColor: " rgba(200, 200, 200, 0.2)",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        height: "7.5rem",
        padding: "0.75rem",
        background: "rgba( 255, 255, 255, 0.5 )",
        backdropFilter: "blur( 0.125rem )",
        boxShadow: '0 0 1.875rem 0 rgba(0,0,0,0.75)',
    },
    idLabel: {
        display: "flex",
        justifyContent: "space-between",
    },
    cardInformation: {
        display: "flex",
        flexDirection: "row",
        columnGap: "3.125rem",
    },
    datePicker: {
        width: "100%",
    },
    Button: {
        backgroundColor: "#000000",
        color: "white",
        fontFamily: 'Manrope !important',
        fontWeight: '600',
        borderRadius: '0rem',
        "&:hover": {
            backgroundColor: "black",
        },
    },
    textField: {
        '& .MuiInputLabel-root': {
            color: '#000',
        },
        "& input": {
            color: '#000',
        }
    },
});

export default useStyles;