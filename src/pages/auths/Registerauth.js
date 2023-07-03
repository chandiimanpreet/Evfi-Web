import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Box, TextField, Button, Divider, Typography } from '@mui/material';
import { useStyles, otpStyle } from './style';
import { registerUser } from '../../utils/auth/user';

export default function Registerauth({ setData, user }) {

	const classes = useStyles();
	const [data, setUserData] = useState({ username: "", email: "", chargerType: "" });

	const changeDataHandler = (e) => {
		setUserData({ ...data, [e.target.name]: e.target.value })
	}

	const saveData = async () => {
		const temp = await registerUser({ ...data, registered: true })
		if (temp.error) {
			console.log(temp.error);
		}
		setData({ ...data, registered: true });
	}
	if (user.registered === true) {
		return <Navigate to={'/'} />
	}
	return (
		<Box className={classes.bodyPage}>
			<Box sx={{ position: 'relative' }}>
				<img className={classes.boxBehindImgStyle} src='/resources/light.png' alt='' />
			</Box>
			<Box component='form' onSubmit={(e) => { e.preventDefault(); saveData(); }} sx={otpStyle.registerBox}>
				<img style={otpStyle.companylogo} src='/resources/light.png' alt='' />
				<Typography className={classes.headOtp}>EVFI</Typography>
				<Typography className={classes.register}>Welcome Back</Typography>
				<Typography style={{ textAlign: 'center', color: '#fff', }}>Please enter your details.</Typography>


				<TextField sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler} required variant='outlined' type='text' label='Username' name='username' value={data.username} />

				<TextField sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler} required variant='outlined' label='Email' type='email' name='email' value={data.email} />

				<TextField sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler} variant='outlined' type='text' label='Charger Type' name='chargerType' value={data.chargerType} />

				<Button size='large' type='submit' className={classes.sbmtOtp} variant='contained'>Register</Button>

				<Divider className={classes.dividerStyle}>or</Divider>
				<Link to='/' style={{ alignSelf: 'center', color: '#fff', textDecoration: 'none', fontFamily: 'inter' }}>Skip for later</Link>
			</Box>
		</Box>
	)
}