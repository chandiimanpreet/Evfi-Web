import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    filterStyleActive: {
        fontFamily: 'inter',
        fontSize: '.8rem',
        fontWeight: '500',
        backgroundColor: '#282828',
        borderColor: '#282828',
        color: '#eee',
        '&:hover': {
            color: '#282828 !important'
        },
    },
    filterStyleInActive: {
        fontFamily: 'inter',
        fontSize: '.8rem',
        fontWeight: '500',
        backgroundColor: '',
        color: '#282828',
        borderColor: '#282828',
    },
});
