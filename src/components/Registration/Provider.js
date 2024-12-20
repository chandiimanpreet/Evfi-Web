import React, { useState, } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import {
	FormControl, MenuItem, InputLabel, Select, Box, TextField, Button, Typography, Grid,
	Chip, Fade, Modal, Backdrop
} from '@mui/material';
import { useStyles, otpStyle } from '../../pages/auths/style';
import { addCharger } from '../../utils/auth/user';
import ModalMap from './ModalMap';
import { DemoContainer, } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { countriesStateCitiesData } from '../../utils/timezone/countriesStateCitiesData';
import { connect } from 'react-redux';
import { addChargerAction, addUserData, clearBookings, setError } from '../../actions';
import {  TimePicker } from '@mui/x-date-pickers';
import BoltIcon from '@mui/icons-material/Bolt';


const Provider = ({ userData, addChargerAction, setError, clearBooking }) => {

	// States
	const [open, setOpen] = useState(false);
	const [aadhaarCard, setAadhaarCard] = useState([]);
	const [chargerArea, setchargerArea] = useState([]);
	const [showOnBtn, setShow] = useState("Register");
	const [data, setUserData] = useState({
		stationName: "",
		address: "",
		country: "India",
		state: "",
		city: "",
		pinCode: "",
		amenities: "",
		chargerLocation: null,
		chargerType: [],
		hostName: "",
		status: "1",
		start: null,
		end: null,
	});
	const [searchParams] = useSearchParams();

	// Styles
	const classes = useStyles();

	// Handlers

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const changeDataHandler = (e) => {
		const { name, value } = e.target;
        setUserData({
            ...data,
            [name]: value
        });
	};

	const timingHandler = (e, flag) => {
		flag ? setUserData({ ...data, start: e }) : setUserData({ ...data, end: e });
	}

	const chipDeleteHandle = (item, flag) => () => {
		flag ? setAadhaarCard((aadhaar) => aadhaar.filter((images) => images !== item)) :
			setchargerArea((aadhaar) => aadhaar.filter((images) => images !== item));
	};

	const fileDataHandler = (e, flag) => {
		flag ? setAadhaarCard([...e.target.files, ...aadhaarCard]) : setchargerArea([...e.target.files, ...chargerArea]);
	};

	const saveData = async () => {
		if (data.chargerLocation !== null && data.openingTime !== null && data.openingTime !== null) {
			setShow("Uploading Data...")
			try {
				console.log(data)

				const timeFormat = new Intl.DateTimeFormat('en-In', { timeStyle: 'short' });
				data.start = timeFormat.format(data.start['$d']).toUpperCase();
				data.end = timeFormat.format(data.end['$d']).toUpperCase();

				console.log(data)
				const startTime = data.start.split(' ');
				const endTime = data.end.split(' ');

				if (startTime[1] === 'AM') {
					data.start = parseInt(startTime[0]);
				} else {
					data.start = parseInt(startTime[0]) + 12;
				}

				if (endTime[1] === 'AM') {
					data.end = parseInt(endTime[0]);
				} else {
					data.end = parseInt(endTime[0]) + 12;
				}

				console.log(data)
				const res = await addCharger(data, chargerArea, aadhaarCard);
				clearBooking();
				addChargerAction(res.chargerId);
			} catch (error) {
				setError(error.msg);
			}
		}
	};

	if (userData.level3 && !searchParams.has('addCharger', 'true')) {
		return <Navigate to={'/requests'} />
	}
	else {
		return (

			<Box className={classes.bodyPage}>
				<Box sx={{ position: 'absolute' }}>
					<img className={classes.boxBehindImgStyle} style={{ left: '16rem', }} src='/resources/light.png' alt='' />
				</Box>
				<Box component='form' onSubmit={(e) => { e.preventDefault(); saveData(); }} sx={otpStyle.registerBox2}>
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" ,justifyContent: "center" }}>
					<Box>
							<BoltIcon
							sx={{ 
								color: "yellow",
								width: "3rem",
								height:"3rem",
								fontSize: { xs: "1.3rem", sm: "2.3rem" },
							}}
							/>
					    </Box>

						<Typography color='#fff' textAlign='center' fontFamily='Manrope !important' fontWeight='bold'
							fontSize='1.5rem'>Become a Provider</Typography>
					</Box>

					<Box>
						<Grid container spacing={2} sx={{ marginBottom: '7px', marginTop: '0.1px' }}>
							<Grid item xs={12} sm={6} lg={3}>
								<TextField required fullWidth sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler} variant='outlined'
									type='text' label='Station Name' name='stationName' value={data.stationName}
									InputProps={{ inputProps: { maxLength: 30, } }} />
							</Grid>
							<Grid item xs={12} sm={6} lg={3}>
								<TextField required fullWidth sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler}
									variant='outlined' type='text' label='Host Name' name='hostName' value={data.hostName}
									InputProps={{ inputProps: { maxLength: 30, } }} />
							</Grid>

							<Grid item xs={12} sm={6} lg={3}>
								<FormControl fullWidth sx={otpStyle.registerTextfieldStyle} >
									<InputLabel id="types" required>Charger Type</InputLabel>
									<Select sx={{ color: '#fff', }} labelId="types" name='chargerType' value={data.chargerType}
										label="Charger Type" onChange={changeDataHandler}>
										<MenuItem value={'Level 1'}>Level 1</MenuItem>
										<MenuItem value={'Level 2'}>Level 2</MenuItem>
										<MenuItem value={'Level 3'}>Level 3</MenuItem>
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={12} sm={6} lg={3}>
								<TextField required fullWidth sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler}
									variant='outlined' type='text' label='Address' name='address' value={data.address}
									InputProps={{ inputProps: { maxLength: 30, } }} />
							</Grid>


						</Grid>

						<Grid container spacing={2} sx={{ marginBottom: '7px' }}>
							<Grid item xs={12} sm={6} lg={2} >
								<FormControl fullWidth sx={otpStyle.registerTextfieldStyle}>
									<InputLabel id="country">Country</InputLabel>
									<Select required sx={{ color: '#fff', }} labelId="country" name='country' value={data.country}
										label="Country" onChange={changeDataHandler}
										MenuProps={{ style: { maxHeight: '60vh', maxWidth: '16vw' } }}
									>
										{
											countriesStateCitiesData.map((item, idx) => (
												<MenuItem key={idx} value={item.name}>{item.name}</MenuItem>
											))
										}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6} lg={2}  >
								<FormControl fullWidth sx={otpStyle.registerTextfieldStyle}>
									<InputLabel id="state">State</InputLabel>
									<Select required sx={{ color: '#fff', }} labelId="state" name='state' value={data.state}
										label="State" onChange={changeDataHandler}
										MenuProps={{ style: { maxHeight: '60vh', maxWidth: '16vw' } }}
									>
										{
											data.country !== "" &&
											countriesStateCitiesData.find(obj => obj.name === data.country).states.map((item, idx) => (
												<MenuItem key={idx} value={item.name}>{item.name}</MenuItem>
											))
										}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6} lg={2}  >
								<FormControl fullWidth sx={otpStyle.registerTextfieldStyle}>
									<InputLabel id="city">City</InputLabel>
									<Select required sx={{ color: '#fff', }} labelId="city" name='city' value={data.city}
										label="City" onChange={changeDataHandler}
										MenuProps={{ style: { maxHeight: '60vh', maxWidth: '16vw', }, }}
									>
										{
											data.country !== "" && data.state !== "" &&
											countriesStateCitiesData.find(obj => obj.name === data.country).states.find(obj => obj.name === data.state).cities.map((item, idx) => (
												<MenuItem key={idx} value={item}>{item}</MenuItem>
											))
										}
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={12} sm={6} lg={3} >
								<TextField required fullWidth sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler}
									variant='outlined' type='number' label='Pin-Code' name='pinCode' value={data.pinCode}
									onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6) }}
								/>
							</Grid>

							<Grid item xs={12} sm={12} lg={3}>
								<TextField required fullWidth sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler}
									variant='outlined' type='text' label='Amenities' name='amenities' value={data.amenities}
									InputProps={{ inputProps: { maxLength: 50, } }} />
							</Grid>

						</Grid>

						<Grid container spacing={2} sx={{ marginBottom: '7px' }}>							
							<Grid item xs={12} sm={6} lg={6} sx={{marginBottom: '0.8rem'}}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer  components={['TimePicker']}>
										<TimePicker views={['hours']} label='Opening Time*' required fullWidth sx={{

													marginBottom: '1rem',
													width: '28rem',
													backgroundColor: ' #ffffff26',
													borderRadius: '5px',
													fontWeight: '500',
													'input': {
													color: '#fff !important',
													},
													'& .MuiInputLabel-root': {
													color: '#fff !important',
													}

										}} disableOpenPicker={true}
											onChange={(e) => { timingHandler(e, true) }} variant='outlined' value={data.start} />
									</DemoContainer>
								</LocalizationProvider>
							</Grid>
							<Grid item xs={12} sm={6} lg={6} sx={{marginBottom: '0.8rem'}}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={['TimePicker']}>
										<TimePicker views={['hours']} label='Closing Time*' required fullWidth sx={{

												marginBottom: '1rem',
												width: '28rem',
												backgroundColor: ' #ffffff26',
												borderRadius: '5px',
												fontWeight: '500',
												'input': {
												color: '#fff !important',
												},
												'& .MuiInputLabel-root': {
												color: '#fff !important',
												}

										}} disableOpenPicker={true}
											onChange={(e) => { timingHandler(e, false) }} variant='outlined' value={data.end} />
									</DemoContainer>
								</LocalizationProvider>
							</Grid>

                            

						</Grid>


						<Grid container spacing={2} >
							<Grid item xs={12} sm={4} lg={4}>
								<Button fullWidth required className={classes.setChargerLocationBtn} onClick={handleOpen}
									name='chargerLocation' value={data.chargerLocation}
								>
									{data.chargerLocation && <CheckCircleOutlineIcon sx={{ marginRight: '5px', fontSize: '26px', color: 'green' }} />}
									{data.chargerLocation === null ? 'Set Charger Location' : 'Location captured'}
								</Button>

								<Modal required open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500, }, }}>
									<Fade in={open}>
										<Box sx={{
											top: '10%',
											left: { xs: '5%', sm: '10%', md: '15%', lg: '25%', xl: '35%', },
											boxShadow: 24, p: 4, position: 'absolute',
										}} className='modalMap'>
											<ModalMap data={data} setUserData={setUserData} handleClose={handleClose} />
										</Box>
									</Fade>
								</Modal>
							</Grid>


							<Grid item xs={12} sm={4} lg={4} >
								<Box>
									<input name='idProof' multiple onChange={fileDataHandler} accept="image/*" style={{ display: 'none' }} id="raised-button-file"
										type="file"
									/>
									<label htmlFor="raised-button-file">
										<Button variant="raised" component="span" className={classes.upLoadBtns} >
											Upload Aadhaar Card
										</Button>
									</label>
								</Box>
							</Grid>

							<Grid item xs={12} sm={4} lg={4}>
								<Box>
									<input name='chargerArea' multiple onChange={fileDataHandler} accept="image/*" style={{ display: 'none' }} id="button-file"
										type="file"
									/>
									<label htmlFor="button-file">
										<Button variant="raised" component="span" className={classes.upLoadBtns} >
											Upload Charger Area
										</Button>
									</label>
								</Box>
							</Grid>
						</Grid><br />

						<Grid container  sx={{ }}>
								{aadhaarCard.length > 0 &&
									aadhaarCard.map((item, idx) =>
										<Chip key={idx} label={item.name.slice(0, 15)} onDelete={chipDeleteHandle(item, true)}
											className={classes.upLoadBtnChips} size='medium' variant="outlined"
										/>
									)
								}
							
								{chargerArea.length > 0 &&
									chargerArea.map((item, idx) =>
										<Chip key={idx} label={item.name.slice(0, 15)} onDelete={chipDeleteHandle(item, false)}
											className={classes.upLoadBtnChips} size='medium' variant="outlined"
										/>
									)
								}
							
						</Grid>
					</Box>
					
					<Button sx={{ width: '30%', margin: '0 auto', marginTop: '10px'}} size='medium' type='submit' className={classes.sbmtOtp} variant='contained'>{showOnBtn}</Button>
				</Box>
			</Box>
		)
	}
}

const mapStateToProps = state => ({
	userData: state.userData.user
})
const mapDispatchFromprops = dispatch => ({
	addUserData: (data) => dispatch(addUserData(data)),
	addChargerAction: (id) => dispatch(addChargerAction(id)),
	clearBooking: ()=> dispatch(clearBookings()),
	setError: (error) => dispatch(setError(error))
})
export default connect(mapStateToProps, mapDispatchFromprops)(Provider);