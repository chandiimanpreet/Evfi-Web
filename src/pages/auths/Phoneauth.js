import React, { useEffect, useRef, useState } from 'react';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, setPersistence, browserSessionPersistence } from "firebase/auth";
import { Navigate, useNavigate } from 'react-router';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, Alert, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useStyles, otpStyle } from './style';
import OTPInput from 'react-otp-input';
import { logInUser } from '../../utils/auth/user';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../utils/config/firebaseConfig';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);

let appVerifier;
export default function Phoneauth({ phone, setNumber, setData, flag, code }) {

	//States
	const [timer, setTimer] = useState(30);
	const [showOtpForm, setShowOtpForm] = useState(false);
	const [util, setUtils] = useState({ loading: false, enterNumberInactive: false, enterOtpInactive: false, resendOtpActive: false, error: null })
	const [otp, setotp] = useState("")
	const [remember, setRemember] = useState(true);
	const recaptchaWrapperRef = useRef(null);
	
	//Styles
	const classes = useStyles();

	//Handlers
	const navigate = useNavigate();

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
	}, [showOtpForm, timer])

	const changePhoneHandler = () => {
		setShowOtpForm(false);
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
		signInWithPhoneNumber(auth, "+" + phone, appVerifier)
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
		if (phone.length < 12) {
			setUtils({ ...util, error: "Please enter valid phone number" })
			return;
		}
		setUtils({ ...util, loading: true, enterNumberInactive: true })
		if (appVerifier && recaptchaWrapperRef.current) {
			appVerifier.clear();
			recaptchaWrapperRef.current.innerHTML = `<div id="recaptcha-container"></div>`;
		}

		// Initialize new reCaptcha verifier
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
				const res = await logInUser(phone);
				if (res.registeredLevel2 === false) {
					setData({ "loading": false, "flag": true, ...res });
					navigate('/register', { replace: true });
				}
				else if (res.registeredLevel2 === true) {
					setData({ ...res, "loading": false, "flag": true });
					navigate('/register-provider', { replace: true })
				} else {
					setUtils({ ...util, ...res, loading: false, enterOtpInactive: false })
				}
			})

			.catch((error) => {
				setUtils({ ...util, enterOtpInactive: false, loading: false, error: error.message })
			})
	};

	if (flag) {
		return <Navigate to='/' />
	}

	return (
		<Box className={classes.bodyPage} >
			<div ref={recaptchaWrapperRef}>
				<div id="recaptcha-container"></div>
			</div>
			<Box sx={{ position: 'relative' }}>
				<img className={classes.boxBehindImgStyle} src='/resources/light.png' alt='' />
			</Box>
			<Box className={classes.loginCard}>
				{
					util.error && (
						<Alert severity='warning' onClose={() => setUtils({ ...util, error: null })}>{util.error}</Alert>
					)
				}
				{(!showOtpForm) ?
					<div>
						<Box component='form' onSubmit={(e) => { e.preventDefault(); submitPhoneNumberAuth(); }} sx={otpStyle.phoneBox}>
							<img style={otpStyle.companylogo} src='/resources/light.png' alt='' />
							<Typography className={classes.companyText}>EVFI</Typography>
							<Typography className={classes.headText}>Verify Your Number</Typography>
							<div>
								<PhoneInput sx={{ backgroundColor: '#ffffff26 !important' }}
									country={(code ? code : 'us')}
									value={phone}
									inputStyle={{ width: '100%', backgroundColor: '#ffffff26', borderColor: '#282828', color: '#fff',}}
									onChange={num => setNumber(num)}
									inputProps={{ required: true }}
								/>
								<FormControlLabel control={<Checkbox defaultChecked onChange={(e) => setRemember(e.target.checked)} size="small" sx={{ color: '#fff' }} />} label="Remember me" sx={{ color: '#fff', fontFamily: "inter", }} />
							</div>
							{(!util.loading) ? <Button size='large' className={classes.sbmtOtp} type='submit' variant='contained'>Get OTP</Button> :
								<LoadingButton size='large' variant='contained' style={otpStyle.getOtpStyle} loading={true} loadingPosition='start'>Get OTP</LoadingButton>}
						</Box>
					</div>
					:
					<div>
						<Box component='form' sx={otpStyle.phoneBoxNext} onSubmit={(e) => { e.preventDefault(); submitCode(); }}>
							<img style={otpStyle.companylogo} src='/resources/light.png' alt='' />
							<Typography className={classes.headOtp}>EVFI</Typography>
							<Typography className={classes.otpTitle}>Enter OTP Code</Typography>
							<Typography className={classes.otpSent}>{`OTP sent to +${phone}`}</Typography>

							<OTPInput inputType='tel' inputStyle={otpStyle.inputStyle} containerStyle={{ alignSelf: 'center', color: '#fff', }} numInputs={6} value={otp}
								onChange={setotp} renderInput={(props) => <input {...props} />} renderSeparator={<span>-</span>} />

							{!util.loading ? <Button size='large' className={classes.sbmtOtp} type='submit' variant='contained'>Submit OTP</Button> :
								<LoadingButton size='large' variant='contained' style={{
									backgroundColor: '#282828', color: 'white', fontFamily: "Manrope", fontWeight: '600',
								}} loading={true} loadingPosition='start'>Verifying OTP</LoadingButton>}

							<Box sx={{ display: 'flex', }}>
								<Button size='large' disabled={timer > 0} onClick={resendOtp} variant='text' className={classes.disabledBtn}>Resend OTP</Button>
								<Typography sx={{ color: '#aaa', marginTop: '6px' }}>
									{timer === 0 ? '' : `: 00:${(timer / 10) >= 1 ? timer : `0${timer}`}`}
								</Typography>
							</Box>

							<Divider className={classes.dividerStyle}>or</Divider>

							<Button size='large' disabled={util.loading} className={classes.disabledBtn} type='button' onClick={changePhoneHandler} variant='text'>Change Phone Number</Button>
						</Box>
					</div>
				}
			</Box>
		</Box>
	)
}
