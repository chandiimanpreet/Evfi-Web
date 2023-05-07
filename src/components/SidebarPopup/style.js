import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  card: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  outerBox: {
    display: 'flex',
    flexDirection: 'vertical',
    maxHeight: 'calc(100vh - 12rem)',
    backgroundColor: '#282828',
    color: '#ffffff',
    marginLeft: '2rem',
    marginTop: '4.9rem',
    borderRadius: '14px',
    zIndex: 1500,
    position: 'fixed',
  },
  searchResultsComtainer: {
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'relative',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#282828',
      backgroundClip: 'content-box',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 2,
      backgroundColor: '#666',
    },
  }
});
