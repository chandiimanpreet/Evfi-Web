import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    filterStyleActive: {
        fontSize: '.8rem',
        fontWeight: '400',
        backgroundColor: '#282828',
        borderColor: '#282828',
        color: '#eee',
        '&:hover': {
            color: '#282828 !important'
        },
    },
    filterStyleInActive: {
        fontSize: '.8rem',
        fontWeight: '400',
        backgroundColor: '',
        color: '#282828',
        borderColor: '#282828',
    },
});
