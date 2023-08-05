import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    bodyPage: {
        height: '100vh',
        width: '100%',
        backgroundColor: '#000',
        backgroundImage: 'radial-gradient(circle at 6% 100%, #e2b714, transparent 30%), radial-gradient(circle at 90% -9%, #e2b714, transparent 30%)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    heading: {
        fontFamily: 'Manrope',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'antiquewhite',
        paddingTop: '1.7rem',
    },
    links: {
        fontSize: '1.4rem',
        textUnderlineOffset: '8px',
        color: 'antiquewhite',
    },
});
