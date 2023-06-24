import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    mainGrid: { backgroundColor: "#FAF9F6", display: 'flex', flexDirection: 'column',width:"100%",},
    welcome: { marginLeft: '5rem', fontSize: '2rem', marginTop: '2rem', marginBottom: '2rem' },
    icon: { marginLeft: '8rem', marginBottom: '2rem' },
    mbottom: { marginBottom: '0.8rem' },
    heading: { marginLeft: '4rem', fontSize: '1.5rem', marginBottom: '6rem' },
    sbmtOtp: {
        backgroundColor: "#282828", color: 'white', "&:hover": {
            backgroundColor: 'black'
        }
    },
    btn: {
        backgroundColor: "#282828",border:'none', "&:hover": {
            backgroundColor: 'black'
        }
    },
    imgStyle: { height: '100vh', width: '100%'},
    registerGrid: { display: 'flex', flexDirection: 'column', backgroundColor: "#FAF9F6" ,width:"100%"},
    register: { textAlign:'center', fontSize: '2rem' },
    skip: { color: '#282828', borderColor: '#282828'  ,alignSelf:'center',width:'100%'},
    changeBtn: {
        backgroundColor: "#FAF9F6",color:'black',border:'none', "&:hover": {
            backgroundColor: "white",border:'none'
        }
    },
    newBtn:{ color: '#282828', borderColor: "#282828" , "&:hover": {
        backgroundColor: "#FAF9F6",borderColor:"#282828"
    }},
    companyText:{postion:'absolute', textAlign: 'center', fontFamily: "'Slabo 27px', serif", fontSize: '1.8rem'},
    headText:{ textAlign: 'center', fontFamily: "'Ysabeau Infant',sans-serif", fontSize: '1.4rem', fontWeight: 'bold' },
    headOtp:{postion:'absolute', textAlign: 'center', fontFamily: "'Slabo 27px', serif", fontSize: '1.8rem'},
    otpTitle:{ textAlign: 'center', fontFamily: "'Ysabeau Infant',sans-serif", fontSize: '1.4rem', fontWeight: 'bold' },
    otpSent:{ textAlign: 'center', fontFamily: "'Ysabeau Infant',sans-serif" },

    
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
	fontSize: '20px'},
    phoneBox:{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem', paddingX: '8rem' },
    registerBox:{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.2rem', paddingX: '6.5rem' },
    companylogo:{position:'relative',top:'0.3rem', height: '1.5rem', width: '1.5rem', backgroundColor: "#282828", borderRadius: '20px', padding: '2px'},
} 