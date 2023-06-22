import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Grid, Box, TextField, Button, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { useStyles } from './style';
import {registerUser} from '../../utils/auth/user';

const images = ["first", "second",  "four", "seven"];
const value=Math.floor(Math.random() * 4);

export default function Registerauth({ setData, user }) {

	const classes = useStyles();
	const [data, setUserData] = useState({ username: "", email: "", chargerType: "" });

	const changeDataHandler = (e) => {
		setUserData({ ...data, [e.target.name]: e.target.value })
	}

	const saveData = async () => {
		const temp= await registerUser({...data,registered:true})
		if(temp.error){
			console.log(temp.error);
		}
		setData({ ...data, registered: true });
	}
	if (user.registered === true) {
		return <Navigate to={'/'} />
	}
	return (
		<>
			<motion.div initial={{ x: 2000, opacity: 0 }} animate={{ opacity: 1, x: 0 }}
				exit={{ x: -2000, transition: { duration: 0.4, delay: 0 } }} transition={{ duration: 1, delay: 0.8 }}>
				<Grid container>

					<Grid justifyContent='space-evenly' className={classes.registerGrid} paddingX={15} xs={5} item>
						<p className={classes.register}>Welcome Back <span style={{ display: 'inline' }}>&#128075;</span></p>
						<p style={{ marginLeft: '6.8rem' }}>Please enter your details.</p>

						<Box component='form' onSubmit={(e) => { e.preventDefault(); saveData(); }} display='flex' flexDirection='column' gap={4}>

							<TextField onChange={changeDataHandler} required variant='outlined' type='text' label='Username' name='username' value={data.username} />
							<TextField onChange={changeDataHandler} required variant='outlined' label='Email' type='email' name='email' value={data.email} />
							<TextField onChange={changeDataHandler} variant='outlined' type='text' label='Charger Type' name='chargerType' value={data.chargerType} />
							<Button type='submit' className={classes.btn} variant='contained'>Register</Button>

						</Box>

						<Divider>or</Divider>
						<Link to='/'><Button className={classes.skip} variant='outlined'>Skip for later</Button></Link>
					</Grid>

					<Grid xs={7} item>
						<img alt='' className={classes.imgStyle} src={`/resources/${images[value]}.jpg`} />
					</Grid>

				</Grid>
			</motion.div >

		</>
	)
}