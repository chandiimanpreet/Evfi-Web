import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
	card: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	outerBox: {
		display: 'flex',
		flexDirection: 'vertical',
		maxHeight: 'calc(100vh - 1rem)',
		backgroundColor: '#ddd',
		color: '#fff',
		zIndex: 1000,
		padding: '0rem .8rem 1rem .8rem ',

	},
	searchResultsContainer: {
		paddingTop: '6px',
		overflowX: 'hidden',
		overflowY: 'auto',
		position: 'relative',
		'&::-webkit-scrollbar': {
			width: '5px',
		},
	}
});
