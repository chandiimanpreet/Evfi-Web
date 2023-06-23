import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
	card: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	outerBox: {
		display: 'flex',
		maxHeight: 'calc(100vh - 1rem)',
		backgroundColor: '#ddd',
		color: '#fff',
		zIndex: 1000,
		padding: '0rem .8rem 1rem 1rem ',
	},
	searchResultsContainer: {
		maxHeight: 'calc(100vh - 8rem)',
		paddingTop: '6px',
		overflowX: 'hidden',
		overflowY: 'auto !important',
		position: 'relative',
		'&::-webkit-scrollbar': {
			width: '5px !important',
		},
	},
	inputField: {
		marginTop: '6px',
		paddingTop: '10px',
		paddingBottom: '10px',
		color: '#282828',
		backgroundColor: '#fff',
		borderRadius: '4px',
		'&::placeholder': {
			color: '#000 !important',
		}
	},
	filterIconStyle: {
		marginLeft: '9px',
		color: '#fff',
		backgroundColor: '#282828',
		borderRadius: '4px',
		padding: '14px 10px',
	},
	bookAgainBtnStyle: {
		backgroundColor: '#FCDD13',
		color: '#292929',
		fontSize: '12px',
		fontWeight: 'bold',
		borderRadius: '10px',
		padding: '1px 8px',
		'&:hover': {
			boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
			backgroundColor: '#FCDD13',
		},
	},
	filterHeadersStyle: {
		fontWeight: '500',
		color: '#444',
	},

	/////////////////////////////////////	 ListItem 	//////////////////////////////////////
	listItemStyle: {
		cursor: 'pointer',
		margin: "0.8rem 0.6rem 0",
		'&:first-child': { marginTop: '0px', },
	},
	listItemCardStyle: {
		paddingTop: '10px',
		flexGrow: 1,
		'&:last-child': {
			paddingBottom: 1,
		},
	},
	bookAgainBtn: {
		backgroundColor: '#FCDD13',
		color: '#292929',
		fontSize: '12px',
		fontWeight: 'bold',
		borderRadius: '10px',
		padding: '1px 8px',
	},


	////////////////////////////////////////// 		Tabs	 	////////////////////////////////////////////////
	tabStyle: {
		minHeight: '35px !important',
		'& button': { color: '#282828', padding: '0px 7rem', minHeight: '35px !important', },
		'& button.Mui-selected': { color: 'primary',  }
	}
});
