import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
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

export default useStyles;