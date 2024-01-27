import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    container: {
        width: '100%',
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",
    },
    infoCard: {
        display: "flex",
        flexDirection: "column",
        rowGap: "18px",
        color: "white",
        borderRadius: "10px",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(200, 200, 200, 0.2)",
        boxShadow: "0 0 1.5rem 0 rgba(0,0,0,0.75)",
    },
    editButton: {
        padding: "10px 30px",
        width: "fit-content",
        backdropFilter: "blur(10px)",
        backgroundColor: "#181818",
        boxShadow: "0 0 1.5rem 0 rgba(0,0,0,0.75)",
        color: "white",
        fontFamily: 'Manrope Important',
        fontWeight: '600',
        "&:hover": {
            backgroundColor: "black",
        },
    },
    textField: {
        input: {
            color: "#fff",
        },
        '& .MuiInputLabel-root': {
            color: "#fff !important",
        },
        '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: "#fff",
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: "#fff !important",
        },
        "& input": {
            color: '#fff',
        }
    },
});

export default useStyles;
