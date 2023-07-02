import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    bodyPage: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        backgroundImage: 'radial-gradient(circle at 6% 100%, #e2b714, transparent 30%), radial-gradient(circle at 90% -9%, #e2b714, transparent 30%)',
    },
    loginCard: {
        boxShadow: '0 0 1.5rem 0 rgba(0,0,0,0.75)',
        backdropFilter: 'blur(50px)',
        '&::-webkit-backdrop-filter': 'blur(25px) ',
        backgroundColor: 'rgba(125, 125, 125, 0.15)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.125)',
    },
    welcome: {
        marginLeft: '5rem',
        fontSize: '2rem',
        marginTop: '2rem',
        marginBottom: '2rem'
    },
    icon: {
        marginLeft: '8rem',
        marginBottom: '2rem'
    },
    mbottom: {
        marginBottom: '0.8rem'
    },
    heading: {
        marginLeft: '4rem',
        fontSize: '1.5rem',
        marginBottom: '6rem'
    },
    sbmtOtp: {
        backgroundColor: "#282828",
        fontFamily: "Manrope 27px",
        color: 'white',
        "&:hover": {
            backgroundColor: 'black',
            color: 'white',
        }
    },
    btn: {
        backgroundColor: '#fff',
        color: '#282828',
        fontFamily: 'Manrope 27px',
        '&:hover': {
            backgroundColor: '#ccc'
        }
    },
    imgStyle: {
        height: '100vh',
        width: '100%'
    },
    registerGrid: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#FAF9F6",
        width: "100%"
    },
    register: {
        textAlign: 'center',
        fontSize: '2rem',
        color: '#fff',
        fontFamily: 'inter',
    },
    skip: {
        color: '#282828',
        borderColor: '#282828',
        alignSelf: 'center',
        width: '100%'
    },
    changeBtn: {
        color: 'white',
        border: 'none',
        fontFamily: 'Manrope 27px',
        "&:hover": {
            backgroundColor: 'rgba(125, 125, 125, 0.15)',
            border: 'none'
        }
    },
    newBtn: {
        color: 'white',
        fontFamily: 'Manrope 27px',
        borderColor: 'white',
        "&:disabled": {
            color: 'white',
            borderColor: 'white'
        }
    },
    companyText: {
        postion: 'absolute',
        color: '#fff',
        textAlign: 'center',
        fontFamily: "Manrope 27px",
        fontSize: '1.8rem',
    },
    headText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: "inter",
        fontSize: '1.4rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
    },
    headOtp: {
        color: '#fff',
        postion: 'absolute',
        textAlign: 'center',
        fontFamily: 'Manrope 27px',
        fontSize: '1.8rem'
    },
    otpTitle: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'inter',
        fontSize: '1.4rem',
    },
    otpSent: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'inter',
    },
    dividerStyle: {
        color: '#ddd',
        '&.MuiDivider-root': {
            '&::before': {
                borderTop: 'thin solid #ddd'
            },
            '&::after': {
                borderTop: 'thin solid #ddd'
            }
        },
    },
    disabledBtn: {
        color: '#fff',
        textTransform: 'capitalize',
        '&:disabled': {
            color: '#aaa',
        }
    },
    boxBehindImgStyle: {
        width: '30rem',
        height: '36rem',
        position: 'absolute',
        top: '-300px',
        left: '5px',
    },
})
export const otpStyle = {
    inputStyle: {
        width: '35px',
        height: '45px',
        borderRadius: '7px',
        border: '0px',
        marginLeft: '8px',
        marginRight: '8px',
        backgroundColor: '#ffffff30',
        color: '#fff',
        fontSize: '20px'
    },
    phoneBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '2rem',
        paddingX: '4rem',
        paddingY: '4rem',
        width: '20rem',
    },
    phoneBoxNext: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '1.5rem',
        paddingX: '4rem',
        paddingY: '3rem',
        width: '20rem',
    },
    registerBox: {
        width: '20rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '1.1rem',
        paddingX: '4rem',
        paddingY: '2rem',
        boxShadow: '0 0 1.5rem 0 rgba(0,0,0,0.75)',
        backdropFilter: 'blur(50px) ',
        '&::-webkit-backdrop-filter': 'blur(25px) ',
        backgroundColor: 'rgba(125, 125, 125, 0.15)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.125)',
    },
    companylogo: {
        height: '2.5rem',
        width: '2.5rem',
        margin: '0 auto',
    },
    registerTextfieldStyle: {
        backgroundColor: ' #ffffff26',
        borderRadius: '5px',
        'input': {
            color: '#fff',
        },
        '& .MuiInputLabel-root': {
            color: '#fff !important',
        }
    },
} 