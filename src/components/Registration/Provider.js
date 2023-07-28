import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
	FormControl, MenuItem, InputLabel, Select, Box, TextField, Button, Divider, Typography, Grid,
	Chip, Fade, Modal, Backdrop
} from '@mui/material';
import { useStyles, otpStyle } from '../../pages/auths/style';
import { registerUser } from '../../utils/auth/user';
import ModalMap from './ModalMap';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../utils/config/firebaseConfig';
import countriesStateCitiesData from '../../utils/timezone/countriesStateCitiesData';

const app = initializeApp(firebaseConfig)
const storage = getStorage(app);

const Provider = ({ user, setData }) => {

	// States
	const [open, setOpen] = useState(false);
	const [aadhaarCard, setAadhaarCard] = useState([]);
	const [chargerArea, setchargerArea] = useState([]);
	const [showOnBtn, setShow] = useState("Register");
	const [data, setUserData] = useState({
		StationName: "",
		Address: "",
		country: "India",
		state: "",
		city: "",
		pinCode: "",
		chargerLocation: null,
		ChargerType: [],
		Price: "",
		HostName: "",
		openingTime: null,
		closingTime: null,
	});
	const [ownStates, setOwnStates] = useState({});
	const [ownCities, setOwnCities] = useState({});

	// Styles
	const classes = useStyles();

	// Handlers

	useEffect(() => {
		if (data.country !== "") {
			setOwnStates(Object.values(countriesStateCitiesData).find(obj => obj.name === data.country).states);
		}

		if (ownStates && ownStates.length > 0 && data.state !== "") {
			setOwnCities(Object.values(ownStates).find(obj => obj.name === data.state).cities);
		}
	}, [ownCities, ownStates, data]);

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const changeDataHandler = (e) => {

		if (e.target.name === 'ChargerType') {
			setUserData({ ...data, [e.target.name]: e.target.value === 'string' ? e.target.value.split(',') : e.target.value });
		}
		setUserData({ ...data, [e.target.name]: e.target.value });
	};

	const chipDeleteHandle1 = (item) => () => {
		setAadhaarCard((aadhaar) => aadhaar.filter((images) => images !== item))
	};
	const chipDeleteHandle2 = (item) => () => {
		setchargerArea((aadhaar) => aadhaar.filter((images) => images !== item))
	};

	const fileDataHandler1 = (e) => {
		setAadhaarCard([...e.target.files, ...aadhaarCard]);
	};

	const fileDataHandler2 = (e) => {
		setchargerArea([...e.target.files, ...chargerArea]);
	};

	const saveData = async () => {
		setShow("Uploading images...")

		const chargersImageURL = [];

		for (const img of chargerArea) {
			const chargersImageRef = ref(storage, `chargers/${user.uid}/${img.name}`);
			const uploadResult = await uploadBytes(chargersImageRef, img);
			chargersImageURL.push(await getDownloadURL(uploadResult.ref));
		}

		const aadharImagesUrl = [];

		for (const img of aadhaarCard) {
			const aadharImageRef = ref(storage, `id_proofs/${img.name + user.uid}`);
			const uploadResult = await uploadBytes(aadharImageRef, img);
			aadharImagesUrl.push(await getDownloadURL(uploadResult.ref));
		}

		setShow("Uploading Data...")

		const temp = await registerUser({ ...data, isProvider: true, aadharImagesUrl, chargersImageURL })

		if (temp.error) {
			console.log(temp.error);
		}
		setShow("Almost Done")
		setData({ ...user, ...data, isProvider: true, aadharImagesUrl, chargersImageURL });
	};

	if (user.isProvider) {
		return <Navigate to={'/requests'} />
	}
	else {
		return (
			<Box className={classes.bodyPage}>
				<Box sx={{ position: 'relative' }}>
					<img className={classes.boxBehindImgStyle} style={{ left: '16rem', }} src='/resources/light.png' alt='' />
				</Box>
				<Box component='form' onSubmit={(e) => { e.preventDefault(); }} sx={otpStyle.registerBox2}>
					<Box sx={{ display: 'flex', flexDirection: 'column', }}>
						<img style={otpStyle.companylogo} src='/resources/light.png' alt='' />
						<Typography className={classes.headOtp}>EVFI</Typography>
						<Typography className={classes.register}>Become a Provider</Typography>
					</Box>
					<Box sx={{ flexGrow: 1 }}>
						<Grid container spacing={2} sx={{ marginBottom: '7px' }}>
							<Grid item xs={4}>
								<TextField required fullWidth sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler} variant='outlined'
									type='text' label='Station Name' name='StationName' value={data.StationName} />
							</Grid>
							<Grid item xs={3}  >
								<TextField required fullWidth sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler}
									variant='outlined' type='text' label='Host Name' name='HostName' value={data.HostName} />
							</Grid>
							<Grid item xs={3}>
								<FormControl required fullWidth sx={otpStyle.registerTextfieldStyle}>
									<InputLabel id="types">Charger Type</InputLabel>
									<Select sx={{ color: '#fff', }} labelId="types" name='ChargerType' value={data.ChargerType}
										label="Charger Type" onChange={changeDataHandler} multiple >
										<MenuItem value={'a'}>Type A</MenuItem>
										<MenuItem value={'b'}>Type B</MenuItem>
										<MenuItem value={'c'}>Type C</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={2}>
								<TextField required fullWidth sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler} variant='outlined'
									type='number' label='Price' name='Price' value={data.Price} />
							</Grid>
						</Grid>
						<Grid container spacing={2} sx={{ marginBottom: '7px' }}>
							<Grid item xs={6}>
								<TextField required fullWidth sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler}
									variant='outlined' type='text' label='Address' name='Address' value={data.Address} />
							</Grid>
							<Grid item xs={2} >
								<FormControl required fullWidth sx={otpStyle.registerTextfieldStyle}>
									<InputLabel id="country">Country</InputLabel>
									<Select sx={{ color: '#fff', }} labelId="country" name='country' value={data.country}
										label="Country" onChange={changeDataHandler}
										MenuProps={{ style: { maxHeight: '60vh', maxWidth: '16vw', }, }}
									>
										{
											countriesStateCitiesData.map((item, idx) => (
												<MenuItem key={idx} value={item.name}>{item.name}</MenuItem>
											))
										}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={2} >
								<FormControl required fullWidth sx={otpStyle.registerTextfieldStyle}>
									<InputLabel id="state">State</InputLabel>
									<Select sx={{ color: '#fff', }} labelId="state" name='state' value={data.state}
										label="State" onChange={changeDataHandler}
										MenuProps={{ style: { maxHeight: '60vh', maxWidth: '16vw', }, }}
									>
										{
											ownStates !== undefined && ownStates.length > 0 && ownStates.map((item, idx) => (
												<MenuItem key={idx} value={item.name}>{item.name}</MenuItem>
											))
										}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={2} >
								<FormControl required fullWidth sx={otpStyle.registerTextfieldStyle}>
									<InputLabel id="city">City</InputLabel>
									<Select sx={{ color: '#fff', }} labelId="city" name='city' value={data.city}
										label="City" onChange={changeDataHandler}
										MenuProps={{ style: { maxHeight: '60vh', maxWidth: '16vw', }, }}
									>
										{
											ownCities !== undefined && ownCities.length > 0 && ownCities.map((item, idx) => (
												<MenuItem key={idx} value={item}>{item}</MenuItem>
											))
										}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={3}>
								<TextField required fullWidth sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler}
									variant='outlined' type='number' label='Pin-Code' name='pinCode' value={data.pinCode} />
							</Grid>
							<Grid item xs={3}  >
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={['TimeField']}>
										<TimeField required fullWidth sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler}
											variant='outlined' label='Opening Time' name='openingTime' value={data.openingTime} />
									</DemoContainer>
								</LocalizationProvider>
							</Grid>
							<Grid item xs={3}  >
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={['TimeField']}>
										<TimeField required fullWidth sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler}
											variant='outlined' label='Closing Time' name='closingTime' value={data.closingTime} />
									</DemoContainer>
								</LocalizationProvider>
							</Grid>
							<Grid item xs={3}  >
								<Button fullWidth className={classes.setChargerLocationBtn} onClick={handleOpen}
									name='chargerLocation' value={data.chargerLocation}
								>
									{data.chargerLocation && <CheckCircleOutlineIcon sx={{ marginRight: '5px', fontSize: '26px', color: 'green' }} />}
									{data.chargerLocation === null ? 'Set Charger Location' : 'Location captured'}
								</Button>
								<Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500, }, }}>
									<Fade in={open}>
										<Box sx={{
											position: 'absolute', top: '10%', left: '25%', border: '2px solid #000', boxShadow: 24, p: 4,
										}} className='modalMap'>
											<ModalMap data={data} setUserData={setUserData} handleClose={handleClose} />
										</Box>
									</Fade>
								</Modal>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item xs={12} >
								<div style={{ display: 'flex', columnGap: '12px' }}>
									<input multiple onChange={fileDataHandler1} accept="image/*" style={{ display: 'none' }} id="raised-button-file"
										type="file"
									/>
									<label htmlFor="raised-button-file">
										<Button variant="raised" component="span" className={classes.upLoadBtns} >
											Upload Aadhaar Card
										</Button>
									</label>
									<Box>
										{aadhaarCard.length > 0 &&
											aadhaarCard.map((item, idx) =>
												<Chip key={idx} label={item.name} onDelete={chipDeleteHandle1(item)}
													className={classes.upLoadBtnChips} size='medium' variant="outlined"
												/>
											)
										}
									</Box>
								</div>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item xs={12} >
								<div style={{ display: 'flex', columnGap: '12px' }}>
									<input multiple onChange={fileDataHandler2} accept="image/*" style={{ display: 'none' }} id="button-file"
										type="file"
									/>
									<label htmlFor="button-file">
										<Button variant="raised" component="span" className={classes.upLoadBtns} >
											Upload Charger Area Image
										</Button>
									</label>
									<Box>
										{chargerArea.length > 0 &&
											chargerArea.map((item, idx) =>
												<Chip key={idx} label={item.image} onDelete={chipDeleteHandle2(item)}
													className={classes.upLoadBtnChips} size='medium' variant="outlined"
												/>
											)
										}
									</Box>
								</div>
							</Grid>
						</Grid>
					</Box>
					<Button onClick={saveData} sx={{ width: '30%', margin: '0 auto', marginTop: '10px', }} size='medium' type='submit' className={classes.sbmtOtp} variant='contained'>{showOnBtn}</Button>

					<Divider className={classes.dividerStyle}>or</Divider>
					<Link to={"/"} style={{ alignSelf: 'center', color: '#fff', textDecoration: 'none', fontWeight: '500', }}>
						Skip for later
					</Link>
				</Box>
			</Box >
		)
	}
}
export default Provider;