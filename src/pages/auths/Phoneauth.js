import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useNavigate } from 'react-router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Slide } from '@mui/material';
import { motion } from 'framer-motion';
const firebaseConfig = {
    apiKey: "AIzaSyAM-1D3n2gZfU05D8SKpDT7WWPYQlGH5mk",
    authDomain: "evfi-prod.firebaseapp.com",
    databaseURL: "https://evfi-prod-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "evfi-prod",
    storageBucket: "evfi-prod.appspot.com",
    messagingSenderId: "758735537136",
    appId: "1:758735537136:web:f0cec73edea6123e55d335"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const defaultTheme = createTheme({

});
export default function Phoneauth(props) {
    const { phone, setNumber, setData } = props;
    const [showOTP, setShow] = useState(false)
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/')
        }
        //eslint-disable-next-line
    },[])
    const configureCaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
            'size': "normal",
            'callback': function (response) {
                submitPhoneNumberAuth();
            },
            'expired-callback': () => {
                console.log("response expired");
            }
        }, auth);
    }

    const submitPhoneNumberAuth = () => {
        let phone = document.getElementById('phone').value;
        phone = "+91" + phone;
        configureCaptcha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phone, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setShow(!showOTP)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const submitCode = () => {
        let code = document.getElementById("otp").value;
        console.log(code);
        window.confirmationResult.confirm(code)
            .then((result) => {
                let user = result.user;
                console.log(user.uid);
                // window.alert("user verified successfully");
                fetch(`https://apifromfb.onrender.com/api/get/Users?id=${user.uid}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.msg) {
                            fetch(`https://apifromfb.onrender.com/api/Users?id=${user.uid}`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    "mobile": phone,
                                    "registered": false
                                })
                            }).then(() => {
                                localStorage.setItem("user", user.uid);
                                localStorage.setItem("registered", false)
                                setData({
                                    "mobile": phone,
                                    "registered": false
                                })
                                navigate('/register', { replace: true })
                            })
                                .catch((error) => {
                                    console.log(error);
                                })
                        } else {
                            console.log("e");
                            localStorage.setItem('user', user.uid)
                            setData(data);
                            if (data.registered === true) {
                                localStorage.setItem('registered', true)
                                navigate('/', { replace: true })
                            } else {
                                localStorage.setItem('registered', false)
                                navigate('/register');
                            }
                        }
                    })
                    .catch((error) => {
                        window.alert("Wrong OTP")
                    })
            })
            .catch((error) => {
                console.log("error");
            })
    }

    return (
        <>
        <motion.div initial={{ width: '100%' }}
        animate={{ width: '100%' }}
        exit={{ x: window.innerWidth,transition:{duration:1}}}>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    <Grid item xs={12} sm={8} md={5} sx={{ backgroundColor: "#212121" }} component={Paper} elevation={6} square>
                        <Slide direction='left' in mountOnEnter unmountOnExit timeout={{ enter: 800 }}>
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Box sx={{ mb: 4, border: 1, borderRadius: 1, p: 1, borderColor: '#ffeb3b', borderWidth: 3 }}>
                                    <img style={{ height: '30px', width: '30px' }} alt='' src={require('../../light.png')} />
                                </Box>
                                <Box sx={{ mb: 10 }}>
                                    <Typography component="h1" variant='h5' style={{ color: 'white', fontWeight: 'bold' }}>Start Your Journey With <span style={{ color: '#ffeb3b' }}>EVFI</span></Typography>
                                </Box>
                                <Avatar sx={{ m: 1, bgcolor: '#ffeb3b', color: "black" }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Slide direction='left' in={!showOTP} mountOnEnter unmountOnExit timeout={{ enter: 800, exit: 0 }}>
                                    <Box sx={{
                                        mx: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}>
                                        <Typography color='white' component="h1" variant="h5">
                                            Verify Phone Number
                                        </Typography>
                                        <Box component="form" onSubmit={(e) => {
                                            e.preventDefault()
                                            submitPhoneNumberAuth()
                                        }} sx={{ mt: 2 }}>
                                            <TextField onChange={(e) => setNumber(e.target.value)}
                                                sx={{
                                                    backgroundColor: 'white', color: 'black'
                                                }}
                                                margin="normal"
                                                required={true}
                                                fullWidth
                                                id="phone"
                                                label="Phone Number"
                                                name="phone"
                                                inputProps={{
                                                    maxLength: 10, minLength: 10
                                                }}
                                                variant="filled"
                                                autoFocus

                                            />
                                            {/* <FormControlLabel
                                                sx={{ color: 'white' }}
                                                control={<Checkbox value="remember" sx={{ color: 'white' }} />}
                                                label="Remember me"
                                            /> */}
                                            <Box ml={2.75} id='recaptcha-container'>

                                            </Box>
                                            <Button
                                                style={{ backgroundColor: '#ffeb3b', color: 'black' }}
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Get OTP
                                            </Button>
                                        </Box>
                                    </Box>
                                </Slide>
                                <Slide direction='left' in={showOTP} mountOnEnter unmountOnExit timeout={800}>
                                    <Box sx={{
                                        mx: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}>
                                        <Typography color='white' component="h1" variant="h5">
                                            OTP Verification
                                        </Typography>
                                        <Box component="form" onSubmit={(e) => {
                                            e.preventDefault()
                                            submitCode()
                                        }} sx={{ mt: 2 }}>
                                            <TextField
                                            
                                                sx={{
                                                    backgroundColor: 'white', color: 'black'
                                                }}
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="otp"
                                                label="Enter 6-digit OTP"
                                                name="otp"
                                                variant="filled"
                                                inputProps={{ minLength: 6, maxLength: 6 }}
                                                autoFocus
                                            />

                                            <Button
                                                style={{ backgroundColor: '#ffeb3b', color: 'black' }}
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Submit OTP
                                            </Button>
                                        </Box>
                                    </Box>
                                </Slide>
                            </Box>
                        </Slide>
                    </Grid>
                </Grid>
            </ThemeProvider>
            </motion.div>
        </>
    )
}
