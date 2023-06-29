import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
	rdNavigation: {
		backgroundColor: "#282828!important",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "10rem",
		top: "2.5rem !important",
		width: "46vw!important",
		left: "calc(50% - 23vw)!important",
	},

	toolbarstyle: {
		display: 'flex!important',
		justifyContent: 'space-around!important',
		width: "100%!important",
		padding: "0.1rem!important",
	},

	inputBtns: {
		backgroundColor: '#ffffff26!important',
		color: '#fff!important',
		borderRadius: '10rem!important',
		fontSize: '16px!important',
		textTransform: 'none!important',
		padding: '0.5rem 1.5rem!important',
		width: "calc(50% - 3.5rem)!important",
		cursor: "text!important",
		display: "flex",
		justifyContent: "left!important",
	},

	boltIcon: {
		color: "yellow",
		fontSize: "2.5rem!important",
		border: "2px solid yellow",
		borderRadius: "100%",
	},

	extendnavigationroot: {
		width: "85vw!important",
		position: 'relative',
		backgroundColor: "#282828!important",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "10rem",
		zIndex: 1500,
	},

	bigboltIconRoot: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		marginTop: '2rem',
		right: '5rem',

	},

	bigboltIcon: {
		top: '-2.3rem',
		color: 'yellow',
		border: '4px solid yellow',
		position: 'absolute',
		fontSize: '2.3rem!important',
		borderRadius: '100%',
		left: '6rem',
		zIndex: 1500,
	},

	extendinputroot: {
		position: 'relative',
		display: 'flex!important',
		justifyContent: 'space-around!important',
		width: "100%!important",
		padding: "0.1rem!important",
		alignItems: 'center',
		left: '0.7rem!important'
	},

	autocompletestyle: {
		width: '33vw',
		border: 'none',
		cursor: 'pointer',
		padding: ' 0.5rem 0.5rem ',
		position: 'relative',

	},
	swapHorizontalCircleIcon: {
		color: '#fff',
		cursor: 'pointer',
		marginRight: '5px',
		marginLeft: '5px',
		marginTop: '0px',
		fontSize: '2.5rem!important'
	},

	travelExploreRoundedIcon: {
		fontSize: '2.3rem',
		color: 'yellow',
		border: "2px solid yellow",
		borderRadius: "100%",
		position: 'relative',
		right: '4rem',
		cursor: 'pointer',
	},

	filterdesign: {
		fontSize: '2.3rem',
		position: 'relative',
		right: '3.5rem',
		color: 'white',
		cursor: 'pointer',
		zIndex: 1500,
	},

	myLocationIcon: {
		fontSize: '2rem',
		position: 'relative',
		color: 'white',
		cursor: 'pointer',
		zIndex: 1500,
		left: '3.3rem',
	},

	exNavPopover: {
		'& .MuiPopover-paper': {
			display: 'flex!important',
			position: 'relative!important',
			maxWidth: 'calc(100% - 0px)!important',
			background: 'none!important',
			boxShadow: 'none!important',
			marginTop: '1rem!important',
			overflowX: 'unset!important',
			overflowY: 'unset!important',
			alignItems: 'center!important',
			borderRadius: '30px!important',
			justifyContent: 'center!important',
		}
	},

	popDesign: {
		'& label.Mui-focused': {
			color: '#fff',
		},

		'& .MuiInput-underline:after': {
			borderBottomColor: '#fff',
		},
		'& .MuiInputLabel-root': {
			color: '#fff',
			left: '0.8rem',
			fontSize: '1.1rem'
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				color: '#fff',
				backgroundColor: '#ffffff26!important',
				border: 'none',
				cursor: 'pointer',
				borderRadius: '2rem'
			},
			'&:hover fieldset': {
				color: '#fff',
				backgroundColor: '#ffffff26!important',
				height: '3.7rem',
				border: 'none',
				cursor: 'pointer'
			},
			'&.Mui-focused fieldset': {
				backgroundColor: '#ffffff26!important',
				color: '#fff',
				border: 'none',
				cursor: 'pointer'
			},
			'& .MuiAutocomplete-input': {
				color: "white",
			},
		},

	},
});