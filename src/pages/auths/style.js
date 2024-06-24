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
        height: '35rem',
        width: '90vw',
        maxHeight: '40rem',
        maxWidth: '22rem',
        boxShadow: '0 0 1.5rem 0 rgba(0,0,0,0.75)',
        backdropFilter: 'blur(45px)',
        backgroundColor: 'rgba(125, 125, 125, 0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.125)',
    },
    sbmtOtp: {
        marginTop: '0.5rem',
        padding: '0.5rem',
        backgroundColor: "#282828",
        fontFamily: "Manrope !important",
        fontWeight: '600',
        fontSize: '1rem',
        width: '100%',
        color: 'yellow',
        "&:hover": {
            backgroundColor: 'black',
            color: 'yellow',
        }
    },
    btn: {
        backgroundColor: '#fff',
        color: '#282828',
        fontFamily: 'Manrope !important',
        '&:hover': {
            backgroundColor: '#ccc'
        }
    },
    imgStyle: {
        height: '100vh',
        width: '100%'
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
        backgroundColor: "#282828",
        fontFamily: "Manrope !important",
        fontWeight: '600',
        color: 'white',
        textTransform: 'capitalize',
        "&:hover": {
            backgroundColor: 'black',
            color: 'white',
        },
        '&:disabled': {
            color: '#aaa',
        }
    },
    boxBehindImgStyle: {
        maxWidth: '31rem',
        width: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        filter: 'blur(20px)',
    },
    setChargerLocationBtn: {
        backgroundColor: '#282828 !important',
        fontSize: '14px',
        color: '#fff',
        textTransform: 'capitalize',
        padding: '16px 14px',
        ':hover': {
            backgroundColor: '#000 !important'
        },
    },
    upLoadBtns: {
        backgroundColor: '#282828 !important',
        fontSize: '14px',
        color: '#fff',
        textTransform: 'capitalize',
        padding: '16px 14px',
        ':hover': {
            backgroundColor: '#000 !important'
        },
        width: '100%',
    },
    upLoadBtnChips: {
        backgroundColor: '#282828 !important',
        fontSize: '14px',
        color: '#fff',
        textTransform: 'capitalize',
        padding: '16px 14px',
        ':hover': {
            backgroundColor: '#000 !important'
        },
        margin: '0.4rem',
    },

    /////////////////////////////////////////   ModalMap Styling    ////////////////////////

    setLocationBtn: {
        position: 'absolute',
        bottom: '1rem ',
        left: '50%',
        transform: 'translateX(-50%)',
        cursor: 'pointer',
        zIndex: 1500,
        color: '#fff',
        backgroundColor: '#282828',
        borderRadius: '5px',
        textTransform: 'capitalize',
        padding: '3px 7px',
        '&:hover': {
            backgroundColor: '#282828',
        },
    },
    currentLocationBtn: {
        zIndex: 1500,
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        backgroundColor: '#fff',
        padding: '4px',
        cursor: 'pointer',
        '&:hover': {
            color: '#ff4d4d',
        },
        '&:active': {
            color: 'red',
        },
    },
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

});


export const otpStyle = {
    inputStyle: {
        width: '100%',
        height: '3rem',
        border: '0px',
        borderRadius: '7px',
        margin: '0.3rem',
        backgroundColor: '#ffffff30',
        color: '#fff',
        fontSize: '20px',
    },
    registerBox: {
        maxHeight: "33rem",
        width: '18rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        margin: '1rem',
        padding: '2rem',
        boxShadow: '0 0 1.5rem 0 rgba(0,0,0,0.75)',
        backdropFilter: 'blur(50px) ',
        '&::-webkit-backdrop-filter': 'blur(25px) ',
        backgroundColor: 'rgba(125, 125, 125, 0.15)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.125)',
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
            width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#e2b714',
            borderRadius: '12px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#ffffff26',
            borderRadius: '12px',
            marginBlock: '0.2rem',
        },
    },
    registerBox2: {
        width: '80vw',
        maxWidth: '55rem',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        boxShadow: '0 0 1.5rem 0 rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(40px)',
        backgroundColor: 'rgba(125, 125, 125, 0.15)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.125)',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#e2b714',
            borderRadius: '12px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#ffffff26',
            borderRadius: '12px',
            marginBlock: '0.2rem',
        },
    },

    boltIcon: {
        color: "yellow",
        border: "2px solid yellow",
        borderRadius: "100%",
    },
    companylogo: {
        display: 'flex',
        alignItems: 'center',
        width: '3rem',
        margin: '0 auto'
    },
    registerTextfieldStyle: {
        marginBottom: '1rem',
        backgroundColor: ' #ffffff26',
        borderRadius: '5px',
        fontWeight: '500',
        'input': {
            color: '#fff !important',
        },
        '& .MuiInputLabel-root': {
            color: '#fff !important',
        }
    },
    gridItem: {
        marginBottom: '0.8rem',
        '& .MuiStack-root':{
            paddingTop: '0rem',
        }
    },
    getOtpStyle: {
        width: '100%',
        backgroundColor: '#282828',
        color: 'white',
        fontFamily: 'Manrope !important',
        fontWeight: '600',
    },
} 