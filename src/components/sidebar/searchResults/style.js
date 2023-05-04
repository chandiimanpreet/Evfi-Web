import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    
  },
  outerBox: {
    display: 'flex',
    flexDirection: 'vertical',
    width: '28rem',
    height: '34rem',
    backgroundColor: '#282828',
    color: '#ffffff',
    marginLeft: '2rem',
    marginTop: '4.9rem',
    borderRadius: '18px',
    zIndex: 1500,
    position: 'fixed',
  },
});
