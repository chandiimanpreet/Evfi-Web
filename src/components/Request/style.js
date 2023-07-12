import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    cardStyle: {
        paddingX: '0.4rem',
        minWidth: 438,
        display: 'flex',
        boxShadow: '5px 0 5px 0 rgba(0,0,0,0.5)',
        "backdropFilter": "blur(19px) saturate(132%)",
        "WebkitBackdropFilter": "blur(19px) saturate(132%)",
        "backgroundColor": "rgba(120, 121, 142, 0.45)",
        "borderRadius": "12px",
        "border": "1px solid rgba(209, 213, 219, 0.3)"
    },
    cardName: {
        width: '85%',
        color: 'antiquewhite',
        fontFamily: 'Manrope !important',
        fontWeight: 'bold',
    },
    cardChip: {
        alignSelf: 'center',
        backgroundColor: "white",
        filter: "opacity(95%)",
        color: 'black',
        fontFamily: 'Manrope !important',
        fontWeight: 'bold',
    },
    charger: {
        fontSize: 14,
        
        marginBottom: '0.3rem',
        color: 'antiquewhite',
    },
    phone: {
        width: '80%',
        color: 'antiquewhite',
        fontSize: 13,
        marginBottom: '1.6rem',
    },
    chipGreen: {
        marginRight: '1rem',
        backgroundColor: '#228b22',
        color: 'white',
        fontFamily: 'Manrope !important',
        fontSize: '1rem',
        "&:hover": {
            backgroundColor: '#228b22'
        } 
    },
    chipRed: {
        backgroundColor: '#cf352e',
        color: 'white',
        fontFamily: 'Manrope !important',
        fontSize: '1rem',
        "&:hover": {
            backgroundColor: '#cf352e'
        } 
    },

});