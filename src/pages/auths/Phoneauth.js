import React, { useEffect, useRef, useState } from 'react';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, setPersistence, browserSessionPersistence } from "firebase/auth";
import { Navigate } from 'react-router';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, Alert, Typography, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useStyles, otpStyle } from './style';
import OTPInput from 'react-otp-input';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../utils/config/firebaseConfig';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { login, setPhoneNo } from '../../actions';
import { connect } from 'react-redux';

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);

let appVerifier;

const Phoneauth = ({ country, login, userData, setPhoneNo }) => {
	
	// States
	const [timer, setTimer] = useState(30);
	const [showOtpForm, setShowOtpForm] = useState(false);
	const [util, setUtils] = useState({
		loading: false,
		enterNumberInactive: false,
		enterOtpInactive: false,
		resendOtpActive: false,
		error: null
	});
	const [otp, setotp] = useState("")
	const [remember, setRemember] = useState(true);
	const recaptchaWrapperRef = useRef(null);

	// Styles
	const classes = useStyles();

	// Handlers
	useEffect(() => {
		if (showOtpForm) {
			if (timer > 0) {
				setTimeout(() => {
					setTimer(timer - 1);
				}, 1000)
			}
		} else {
			setTimer(30);
		}
	}, [showOtpForm, timer]);

	const changePhoneHandler = () => {
		setShowOtpForm(false);
		setotp("");
		setUtils({ ...util, error: null, enterNumberInactive: false, resendOtpActive: false })
	};

	const generateRecaptcha = () => {
		appVerifier = new RecaptchaVerifier(
			"recaptcha-container",
			{
				size: "invisible",
			},
			auth
		)
	};

	const signInHandler = (resend) => {
		signInWithPhoneNumber(auth, "+" + userData.phone, appVerifier)
			.then((confirmationResult) => {
				if (resend) {
					setTimer(30);
					setShowOtpForm(true);
					setUtils({ ...util, resendOtpActive: false, loading: false, error: null });
				} else {
					setShowOtpForm(true);
					setUtils({ ...util, loading: false, error: null });
				}
				window.confirmationResult = confirmationResult;
			})
			.catch((error) => {
				setUtils({ ...util, error: error.message, loading: false, enterNumberInactive: false })
			})
	};

	const submitPhoneNumberAuth = () => {
		if (userData.phone.length < 12) {
			setUtils({ ...util, error: "Please enter a valid phone number" })
			return;
		}
		setUtils({ ...util, loading: true, enterNumberInactive: true })
		if (appVerifier && recaptchaWrapperRef.current) {
			appVerifier.clear();
			recaptchaWrapperRef.current.innerHTML = `<div id="recaptcha-container"></div>`;
		}

		generateRecaptcha();
		if (!remember) {
			setPersistence(auth, browserSessionPersistence)
				.then(() => {
					signInHandler(false);
				})
				.catch((error) => {
					setUtils({ ...util, error: error.message, loading: false, enterNumberInactive: false })

				})
		} else {
			signInHandler(false);
		}
	};

	const resendOtp = () => {
		if (!remember) {
			setPersistence(auth, browserSessionPersistence)
				.then(() => {
					signInHandler(true)
				})
				.catch((error) => {
					setUtils({ ...util, error: error.message, loading: false })

				})
		} else {
			signInHandler(resendOtp)
		}
	};

	const submitCode = async () => {

		setUtils({ ...util, loading: true, enterOtpInactive: true })
		if (otp.length < 6) {
			setUtils({ ...util, enterOtpInactive: false, loading: false, error: "Wrong OTP" })
			return;
		}
		window.confirmationResult.confirm(otp)
			.then(async () => {
				login();
			})
			.catch((error) => {
				setUtils({ ...util, enterOtpInactive: false, loading: false, error: error.message })
			})
	};

	if (userData.user) {
		return <Navigate to='/register/level1' />
	}
	return (
		<Box className={classes.bodyPage} >
			<div ref={recaptchaWrapperRef}>
				<div id="recaptcha-container"></div>
			</div>

			<img className={classes.boxBehindImgStyle}
				src='/resources/light.png' alt='' />

			<Box className={classes.loginCard} >
				{util.error && (
					<Alert severity='warning' onClose={() => setUtils({ ...util, error: null })}>{util.error}</Alert>
				)}
				{!showOtpForm ?
					<Grid gap={3} display='flex' flexDirection='column' alignContent='center'
						textAlign='center' padding='4rem 2rem' >
						<img style={otpStyle.companylogo} src='/resources/light.png' alt='' />

						<Typography
							color='#fff' textAlign='center' fontFamily='Manrope !important' fontWeight='bold' fontSize='1.8rem'>EVFI</Typography>

						<Typography color='#fff' fontSize='1.4rem' fontWeight='500' marginBottom='1.5rem'>
							Verify Your Number
						</Typography>

						<PhoneInput
							country={country.countryCode}
							value={userData.phone}
							inputStyle={{ width: '100%', backgroundColor: '#ffffff26', borderColor: '#282828', color: '#fff', }}
							onChange={num => { setPhoneNo(num); }}
							inputProps='true'
						/>

						<FormControlLabel control={<Checkbox defaultChecked onChange={(e) => setRemember(e.target.checked)} />}
							label='Remember me' style={{ color: 'white' }}
						/>

						<LoadingButton size='large' variant='contained' style={otpStyle.getOtpStyle} loading={util.loading} onClick={submitPhoneNumberAuth} loadingPosition='start'> {util.loading ? 'Please wait...' : 'Verify OTP'}</LoadingButton>
					</Grid>
					:
					<Grid gap={2} display='flex' flexDirection='column' padding={2} textAlign='center' >

						<img style={otpStyle.companylogo} src='/resources/light.png' alt='' />

						<Typography color='#fff' fontFamily='Manrope !important' fontWeight='bold' fontSize='1.8rem'>EVFI</Typography>

						<Typography color='#fff' fontSize='1.4rem' fontWeight='500' marginBottom='1rem'>Enter OTP Code</Typography>

						<Typography color='#fff' fontSize='1rem' marginBottom='1.5rem'>{`OTP sent to +${userData.phone}`}</Typography>

						<OTPInput inputStyle={otpStyle.inputStyle} containerStyle={{ color: '#fff' }}
							numInputs={6} value={otp} onChange={setotp} vrenderSeparator='-'
							renderInput={(props) => <input {...props} />}
						/>

						<LoadingButton size='large' variant='contained' style={otpStyle.getOtpStyle} loading={util.loading} onClick={submitCode} loadingPosition='start'> {util.loading ? 'Please wait...' : 'Verify OTP'}</LoadingButton>

						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography color='#fff' paddingTop={1.5}>Resend OTP</Typography>

							<Button size='large' disabled={timer > 0} onClick={resendOtp} variant='text' style={{ display: timer > 0 ? 'none' : 'block', color: 'white' }}>Send</Button>

							<Typography style={{ color: '#aaa', marginTop: '9px', display: timer > 0 ? 'block' : 'none' }}>
								{timer === 0 ? '' : `00:${(timer / 10) >= 1 ? timer : `0${timer}`}`}
							</Typography>
						</Box>

						<Divider className={classes.dividerStyle}>or</Divider>

						<Button size='large' disabled={util.loading} className={classes.disabledBtn} type='button' onClick={changePhoneHandler} variant='text'>Change Phone Number</Button>
					</Grid>
				}
			</Box>
		</Box>
	)
}
const mapStateToProps = state => ({
	userData: state.userData
})
const mapDispatchFromProps = dispatch => ({
	login: () => dispatch(login()),
	setPhoneNo: (number) => dispatch(setPhoneNo(number))
})
export default connect(mapStateToProps, mapDispatchFromProps)(Phoneauth);