import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        overflow: "auto",
        height: "635px",
    },
    cardContainer: {
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",
    },
    paymentCard: {
        width: "800px",
        padding: "30px",
        color: "white",
        fontFamily: 'Manrope',

        borderRadius: "10px",
        backdropFilter: "blur(10px)",
        backgroundColor: " rgba(200, 200, 200, 0.2)",
        WebkitBackdropFilter: "blur( 6px )",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        margin: "15px",
        width: "300px",
        height: "120px",
        padding: "12px",
        background: "rgba( 255, 255, 255, 0.5 )",
        backdropFilter: "blur( 2px )",
        boxShadow: '0 0 1.5rem 0 rgba(0,0,0,0.75)',
    },
    idLabel: {
        display: "flex",
        justifyContent: "space-between",
    },
    cardInformation: {
        display: "flex",
        flexDirection: "row",
        columnGap: "50px",
    },
    datePicker: {
        width: "100%",
    },
    Button: {
        backgroundColor: "#000000",
        color: "white",
        fontFamily: 'Manrope',
        fontWeight: '600',
        borderRadius: '0px',
        "&:hover": {
            backgroundColor: "black",
        },
    },
    textField: {
        '& .MuiInputLabel-root': {
            fontFamily: 'inter',
            color: '#000',
        },
        "& input": {
            color: '#000',
            fontFamily: 'inter',
        }
    },
});

export default useStyles;
