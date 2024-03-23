import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    cardStyle: {
        maxWidth: '25rem',
        display: 'flex',
        boxShadow: '5px 0 5px 0 rgba(0,0,0,0.5)',
        backdropFilter: "blur(19px) saturate(132%)",
        backgroundColor: "rgba(120, 121, 142, 0.45)",
        borderRadius: "12px",
        border: "1px solid rgba(209, 213, 219, 0.3)"
    },
    cardName: {
        color: 'antiquewhite',
        fontFamily: 'Manrope !important',
        fontWeight: 'bold',
        fontSize: '1rem',
    },
    cardChip: {
        backgroundColor: 'white',
        opacity: '0.95',
        color: 'black',
        fontFamily: 'Manrope',
        fontWeight: 'bold',
      },
      
    charger: {
        fontSize: '0.8rem',
        width: 'fit-content',
        color: 'antiquewhite',
    },
    phone: {
        width: 'fit-content',
        color: 'antiquewhite',
        fontSize: '0.8rem',
        marginBottom: '1rem',
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
    buttons: {
        display: 'flex',
        flexDirection: 'row',
    }
});