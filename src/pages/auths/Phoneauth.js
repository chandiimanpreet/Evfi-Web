import React, { useEffect, useRef, useState } from 'react'
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { Navigate, useNavigate } from 'react-router';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, Divider, Alert } from '@mui/material';
import { useStyles, otpStyle } from './style';
import OTPInput from 'react-otp-input';
import { logInUser } from '../../utils/auth/user';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../utils/config/firebaseConfig';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const images = ["first", "second", "third", "four", "five", "six", "seven"];
const value = Math.floor(Math.random() * 7);

let appVerifier;
export default function Phoneauth({ phone, setNumber, setData, flag, code }) {
	const classes = useStyles();
	const [timer, setTimer] = useState(30);
	const [util, setUtils] = useState({ showOtpForm: false, loading: false, enterNumberInactive: false, enterOtpInactive: false, resendOtpActive: false, error: null })
	const [otp, setotp] = useState("")
	const recaptchaWrapperRef = useRef(null);

	const navigate = useNavigate();
	useEffect(() => {
		if (util.showOtpForm) {
			if (timer > 0) {
				setTimeout(() => {
					setTimer(timer - 1);
				}, 1000)
			} else {
				setUtils({ ...util, resendOtpActive: true })
			}
		} else {
			setTimer(30);
		}
	}, [util, timer])
	const changePhoneHandler = () => {
		setUtils({ ...util, showOtpForm: false, error: null, enterNumberInactive: false })
	}
	const generateRecaptcha = () => {
		appVerifier = new RecaptchaVerifier(
			"recaptcha-container",
			{
				size: "invisible",
			},
			auth
		)
	}
	const submitPhoneNumberAuth = () => {
		if(phone.length<12){
			setUtils({...util,error:"Please enter valid phone number"})
			return;
		}
		setUtils({ ...util, loading: true, enterNumberInactive: true })
		if (appVerifier && recaptchaWrapperRef.current) {
			appVerifier.clear();
			recaptchaWrapperRef.current.innerHTML = `<div id="recaptcha-container"></div>`;
		}

		// Initialize new reCaptcha verifier
		generateRecaptcha();
		signInWithPhoneNumber(auth, "+" + phone, appVerifier)
			.then((confirmationResult) => {
				setUtils({ ...util, showOtpForm: true, loading: false, error: null });
				window.confirmationResult = confirmationResult;
			})
			.catch((error) => {
				setUtils({ ...util, error: error.message })
			})
	}

	const resendOtp = () => {
		setUtils({ ...util, resendOtpActive: false });
		setTimer(30);
		signInWithPhoneNumber(auth, "+" + phone, appVerifier)
			.then((confirmationResult) => {
				window.confirmationResult = confirmationResult;
			})
			.catch((error) => {
				setUtils({ ...util, error: error.message })
			})
	}

	const submitCode = async () => {

		setUtils({ ...util, loading: true, enterOtpInactive: true })
		if (otp.length < 6) {
			setUtils({ ...util, enterOtpInactive: false, loading: false, error: "Wrong OTP" })
			return;
		}
		window.confirmationResult.confirm(otp)
			.then(async () => {
				const res = await logInUser(phone);
				console.log("e");
				if (res.registered === false) {
					setData({ "loading": false, "flag": true, ...res });
					navigate('/register', { replace: true });
				}

				else if (res.registered === true) {
					setData({ ...res, "loading": false, "flag": true });
					navigate('/', { replace: true })
				} else {
					setUtils({ ...util, ...res, loading: false, enterOtpInactive: false })
				}
			})

			.catch((error) => {
				setUtils({ ...util, enterOtpInactive: false, loading: false, error: error.message })
			})
	}
	if (flag) {
		return <Navigate to='/' />
	}
	return (
		<>
			<Grid container>

				<Grid className={classes.mainGrid} paddingX={19} xs={5} item>
					<div ref={recaptchaWrapperRef}>
						<div id="recaptcha-container"></div>
					</div>
					{util.error && <Alert severity='warning' onClose={() => setUtils({ ...util, error: null })}>{util.error}</Alert>}
					{(!util.showOtpForm) ? <div>

						<Box marginTop={25} component='form' onSubmit={(e) => { e.preventDefault(); submitPhoneNumberAuth(); }} display='flex' flexDirection='column'>

							<PhoneInput
								containerStyle={{ marginBottom: '2rem' }}
								country={(code?code:'us')}
								value={phone}
								inputStyle={{ width: '100%' }}
								onChange={num => setNumber(num)}
								inputProps={{ required: true }}								
							/>

							{(!util.loading) ? <Button className={classes.sbmtOtp} type='submit' on variant='contained'>Get OTP</Button> :
								<LoadingButton variant='contained' className={classes.btn} loading={true} loadingPosition='start'>Get OTP</LoadingButton>}
						</Box>
					</div> 
					:
						<div>

							<Box marginTop={10} component='form' display='flex' flexDirection='column' onSubmit={(e) => { e.preventDefault(); submitCode(); }}>
								<p style={{ marginBottom: '4rem', paddingLeft: '3rem' }}>{`OTP sent to +91${phone}`}</p>

								<OTPInput inputType='tel' inputStyle={otpStyle.inputStyle} containerStyle={{ marginBottom: '4rem' }} numInputs={6} value={otp}
									onChange={setotp} renderInput={(props) => <input {...props} />} renderSeparator={<span>-</span>} />

								{!util.loading ? <Button className={classes.btn} type='submit' variant='contained'>Submit OTP</Button> :
									<LoadingButton variant='contained' className={classes.btn} loading={true} loadingPosition='start'>Verifying OTP</LoadingButton>}

								<Button disabled={!util.resendOtpActive} onClick={resendOtp} className={classes.newBtn} variant='outlined'>
									{util.resendOtpActive ? 'Resend OTP' : `Resend OTP 00:${(timer / 10) >= 1 ? timer : `0${timer}`}`}
								</Button>

								<Divider sx={{ marginBottom: '1rem' }}>or</Divider>

								<Button disabled={util.loading} className={classes.changeBtn} type='button' onClick={changePhoneHandler} variant='outlined'>Change Phone Number</Button>
							</Box>

						</div>}
				</Grid>

				<Grid xs={7} item>
					<img alt='' className={classes.imgStyle} src={`/resources/${images[value]}.jpg`} />
				</Grid>

			</Grid>
		</>
	)
}
