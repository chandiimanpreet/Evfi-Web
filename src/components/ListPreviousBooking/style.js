import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
	/////////////////////////////////////	 List 	//////////////////////////////////////
	outerBox: {
		display: 'flex',
		height: '100vh',
		justifyContent: 'center',
		backgroundColor: '#000',
		backgroundImage: 'radial-gradient(circle at 6% 100%, #e2b714, transparent 30%), radial-gradient(circle at 90% -9%, #e2b714, transparent 30%)',
		color: '#fff',
		zIndex: 1000,
	},
	searchResultsContainer: {
		overflowY: 'auto',
		display: "flex",
		width:'fit-content',
		justifyContent: "center",
		flexDirection: 'row',
		flexWrap: 'wrap',
		'&::-webkit-scrollbar': {
			display:'none',
		},
	},
	inputField: {
		marginTop: '6px',
		padding: '10px 0',
		color: '#fff',
		backgroundColor: 'rgba(255, 255, 255, 0.15)',
		borderRadius: '4px',
		fontFamily: 'inter !important',
		'&::placeholder': {
			color: '#fff !important',
		}
	},
	filterIconStyle: {
		marginLeft: '9px',
		color: '#fff',
		backgroundColor: '#282828',
		borderRadius: '4px',
		padding: '12px 10px',
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
		borderRadius: '0px 12px 12px 0px',
		border: '1px solid rgba(255, 255, 255, 0.125)',
		padding: '0.2rem',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	cancelBtn: {
		backgroundColor: '#FCDD13',
		color: '#292929',
		fontFamily: 'Manrope !important',
		fontWeight: 'bold',
		borderRadius: '10px',
		padding: '1px 8px',
		transition: 'transform 0.2s ease-out',
		'&:hover': {
		  backgroundColor: '#FCDD13',
		  borderColor: '#0062cc',
		  transform: 'translateY(-2px)',
		},
	  },
	cardTextStyle: {
		color: '#eee',
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis"
	},
});
