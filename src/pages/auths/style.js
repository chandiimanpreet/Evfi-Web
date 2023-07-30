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
        '&::-webkit-backdrop-filter': 'blur(25px)',
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
        fontFamily: "Manrope !important",
        fontWeight: '600',
        width: '100%',
        color: 'white',
        "&:hover": {
            backgroundColor: 'black',
            color: 'white',
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
    registerGrid: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#FAF9F6",
        width: "100%"
    },
    register: {
        textAlign: 'center',
        fontSize: '1.7rem',
        color: '#fff',
        fontWeight: '500',
        marginBottom: '1rem'
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
        fontFamily: 'Manrope !important',
        "&:hover": {
            backgroundColor: 'rgba(125, 125, 125, 0.15)',
            border: 'none'
        }
    },
    newBtn: {
        color: 'white',
        fontFamily: 'Manrope !important',
        borderColor: 'white',
        "&:disabled": {
            color: 'white',
            borderColor: 'white'
        }
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
        width: '20rem',
        height: '26rem',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    setChargerLocationBtn: {
        backgroundColor: '#282828 !important',
        fontSize: '14px',
        color: '#fff',
        textTransform: 'capitalize',
        padding: '16.5px 14px',
        ':hover': {
            backgroundColor: '#000 !important'
        },
    },
    upLoadBtns: {
        backgroundColor: '#282828 !important',
        fontSize: '12px !important',
        color: '#fff !important',
        textTransform: 'capitalize !important',
        marginTop: '8px !important',
        ':hover': {
            backgroundColor: '#000 !important',
        },
    },
    upLoadBtnChips: {
        color: 'white !important',
        marginRight: '8px',
        marginTop: '8px',
        '& .MuiChip-deleteIcon': {
            color: 'white !important',
            ':hover': {
                color: 'white !important'
            },
        },
    },



    /////////////////////////////////////////   ModalMap Styling    ////////////////////////
    setLocationBtn: {
        position: 'absolute',
        top: '1rem ',
        right: '.5rem',
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
        width: '30px',
        height: '2.5rem',
        borderRadius: '7px',
        border: '0px',
        marginLeft: '5px',
        marginRight: '5px',
        backgroundColor: '#ffffff30',
        color: '#fff',
        fontSize: '20px',
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
        maxHeight: "33rem",
        width: '18rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        margin: '1rem',
        padding: '4%',
        boxShadow: '0 0 1.5rem 0 rgba(0,0,0,0.75)',
        backdropFilter: 'blur(50px) ',
        '&::-webkit-backdrop-filter': 'blur(25px) ',
        backgroundColor: 'rgba(125, 125, 125, 0.15)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.125)',
    },
    registerBox2: {
        width: '60vw',
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
    getOtpStyle: {
        backgroundColor: '#282828',
        color: 'white',
        fontFamily: 'Manrope !important',
        fontWeight: '600',
    },
    availabiltyBoxStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        padding: '1rem 2rem 3rem 0rem',
        display: 'flex',
        flexDirection: 'column',
        height: '55%',
        width: '50%',
        borderRadius: '8px',
    },
} 