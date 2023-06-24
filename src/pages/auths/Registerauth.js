import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Grid, Box, TextField, Button, Divider, Typography } from '@mui/material';
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
		<>
			<Grid container>

				<Grid className={classes.registerGrid} xs={5} item>
					<Box component='form' onSubmit={(e) => { e.preventDefault(); saveData(); }} sx={otpStyle.registerBox}>
						<Typography className={classes.headOtp}><img style={otpStyle.companylogo} src='/resources/light.png' alt='' />&nbsp;&nbsp; EVFI</Typography>
						<br /><br />
						<Typography className={classes.register}>&nbsp;&nbsp;&nbsp;Welcome Back <span style={{ display: 'inline' }}>&#128075;</span></Typography>
						<Typography style={{ textAlign: 'center' }}>Please enter your details.</Typography>
						<TextField onChange={changeDataHandler} required variant='outlined' type='text' label='Username' name='username' value={data.username} />
						<TextField onChange={changeDataHandler} required variant='outlined' label='Email' type='email' name='email' value={data.email} />
						<TextField onChange={changeDataHandler} variant='outlined' type='text' label='Charger Type' name='chargerType' value={data.chargerType} />
						<Button type='submit' className={classes.btn} variant='contained'>Register</Button>

						<Divider>or</Divider>
						<Link to='/' style={{ alignSelf: 'center' }}><Button className={classes.changeBtn} variant='outlined'>Skip for later</Button></Link>
					</Box>

				</Grid>

				<Grid xs={7} item>
					<img alt='' className={classes.imgStyle} src={`/resources/four.jpg`} />
				</Grid>

			</Grid>

		</>
	)
}