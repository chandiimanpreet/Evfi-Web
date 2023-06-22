import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    mainGrid: { backgroundColor: "#FAF9F6", display: 'flex', flexDirection: 'column', paddingTop:'7rem'},
    welcome: { marginLeft: '5rem', fontSize: '2rem', marginTop: '2rem', marginBottom: '2rem' },
    icon: { marginLeft: '8rem', marginBottom: '2rem' },
    mbottom: { marginBottom: '0.8rem' },
    heading: { marginLeft: '4rem', fontSize: '1.5rem', marginBottom: '6rem' },
    sbmtOtp: {
        backgroundColor: "#282828", color: 'white', marginBottom: '4rem', "&:hover": {
            backgroundColor: 'black'
        }
    },
    btn: {
        backgroundColor: "#282828",marginBottom:'1rem',border:'none', "&:hover": {
            backgroundColor: 'black'
        }
    },
    imgStyle: { height: '46.1rem', width: '55.9rem', borderRadius: '5px'},
    registerGrid: { display: 'flex', flexDirection: 'column', backgroundColor: "#FAF9F6" },
    register: { marginLeft: '5rem', fontSize: '2rem' },
    skip: { color: '#282828', borderColor: '#282828' },
    changeBtn: {
        backgroundColor: "#FAF9F6",color:'black',marginBottom:'1rem',border:'none', "&:hover": {
            backgroundColor: "white",border:'none'
        }
    },
    newBtn:{ marginBottom: '1rem', color: '#282828', borderColor: "#282828" , "&:hover": {
        backgroundColor: "#FAF9F6",borderColor:"#282828"
    }},
})
export const otpStyle={
    inputStyle:{
	width: '35px',
	height: '45px',
	borderRadius: '7px',
	border: '0px',
	marginLeft: '8px',
	marginRight: '8px',
	backgroundColor: '#E2DFD2',
	fontSize: '20px'}
} 