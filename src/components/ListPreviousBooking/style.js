import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
	card: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	outerBox: {
		display: 'flex',
		maxHeight: 'calc(100vh - 1rem)',
		backgroundColor: '#000',
		backgroundImage: 'radial-gradient(circle at 6% 100%, #e2b714, transparent 30%), radial-gradient(circle at 90% -9%, #e2b714, transparent 30%)',
		color: '#fff',
		zIndex: 1000,
		padding: '0rem .8rem 1rem 1rem ',
	},
	searchResultsContainer: {
		maxHeight: 'calc(100vh - 5rem)',
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
		color: '#fff',
		backgroundColor: 'rgba(255, 255, 255, 0.15)',
		borderRadius: '4px',
		'&::placeholder': {
			color: '#fff !important',
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
		margin: " 0.8rem 0.6rem 0",
		'&:first-child': { marginTop: '0px', },
	},
	listItemCardStyle: {
		boxShadow: '5px 0 5px 0 rgba(0,0,0,0.5)',
		backdropFilter: 'blur(10px)',
		'&::-webkit-backdrop-filter': 'blur(10px) ',
		backgroundColor: 'rgba(200, 200, 200, 0.2)',
		borderRadius: '0px 10px 10px 0px',
		border: '1px solid rgba(255, 255, 255, 0.125)',
		padding: '10px',
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
		'& button.Mui-selected': { color: 'primary', }
	}
});
