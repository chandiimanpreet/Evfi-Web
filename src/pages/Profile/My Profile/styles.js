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
        // Hide scrollbar for Chrome, Safari and Opera
        '&::-webkit-scrollbar': {
            display: 'none',
        },

        // Hide scrollbar for IE, Edge and Firefox
        '&::-ms-overflow-style': 'none',  /* IE and Edge */
        '&::-scrollbar-width': 'none',  /* Firefox */
    },
    container: {
        display: "flex",
        flexDirection: "column",
        rowGap: "1.6rem",
    },
    infoCard: {
        display: "flex",
        flexDirection: "column",
        rowGap: "1.125rem",
        padding: "1rem",
        color: "white",
        borderRadius: "0.625rem",
        backdropFilter: "blur(0.625rem)",
        backgroundColor: "rgba(200, 200, 200, 0.2)",
        boxShadow: "0 0 1.875rem 0 rgba(0, 0, 0, 0.75)",
    },
    editButton: {
        padding: "0.625rem 1.875rem",
        width: "fit-content",
        backdropFilter: "blur(0.625rem)",
        backgroundColor: "#181818",
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