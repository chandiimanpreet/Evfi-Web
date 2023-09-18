import React, { useState } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material';
import { useStyles, otpStyle } from '../../pages/auths/style';
import { registerUser } from '../../utils/auth/user';
import { useTheme } from '@mui/material/styles';
import CustomerForm from './CustomerForm';
import NameInput from './NameInput';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../utils/config/firebaseConfig';
import { addUserData } from '../../actions';
import { connect } from 'react-redux';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const names = [
	'Driving License',
	'Aadhar Card',
	'Vehicle Registration',
	'Voter Id',
	'Pan Card', 'None'
];

function getStyles(name, personName, theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

function Registerauth({ addUserData, userData }) {
	const app = initializeApp(firebaseConfig)
	const storage = getStorage(app);

	const { level } = useParams();
	const [searchParams] = useSearchParams();
	const [data, setUserData] = useState({
		name: userData.name,
		vehicleManufacturer: "",
		chargingRequirements: "",
		vehicleNumber: '',
		idImageUrl: null,
		mileage: '',
		batteryCapacity: ''
	});
	const [image, setImage] = useState(null);
	const [idType, setIdType] = useState('');

	// Styles
	const classes = useStyles();
	const theme = useTheme();

	// Handlers
	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setIdType(value);
	};

	const changeDataHandler = (e) => {
		setUserData({ ...data, [e.target.name]: e.target.value })
	};

	const saveData = async () => {
		if (!userData.level1) {
			await registerUser({ name: data.name, level1: true });
			addUserData({ name: data.name, level1: true });
		} else {
			let downloadURL = null;
			if (image !== null) {
				const imageRef = ref(storage, `id_proofs/${image.name}`);
				const uploadResult = await uploadBytes(imageRef, image);
				downloadURL = await getDownloadURL(uploadResult.ref);
			}
			const temp = await registerUser({ ...data, idImageURL: downloadURL, level2: data })
			if (temp.error) {
				console.log(temp.error);
			}
			addUserData({ ...data, idImageURL: downloadURL, level2: data })
		}
	}
	
	if(!userData){
		return <Navigate to={'/auth'}/>
	}
	else if (level === "level1" && userData.level1) {
		return <Navigate to={'/'} />
	}
	else if (level === "level2" && userData.level2) {
		return <Navigate to={`/${searchParams.has("redirectTo") ? searchParams.get("redirectTo") : ""}`} />
	}
	else {
		return (
			<Box className={classes.bodyPage}>
				<Box sx={{ position: 'relative' }}>
					<img className={classes.boxBehindImgStyle} src='/resources/light.png' alt='' />
				</Box>

				<Box component='form' onSubmit={(e) => { e.preventDefault(); saveData(); }} sx={otpStyle.registerBox}>
					<img style={otpStyle.companylogo} src='/resources/light.png' alt='' />

					<Typography color='#fff' textAlign='center' fontFamily='Manrope !important' fontWeight='bold' fontSize='1.8rem'>EVFI</Typography>

					<Typography color='#fff' textAlign='center' fontSize='1.4rem' fontWeight='500' marginBottom='1.5rem'>Welcome Back</Typography>
					{
						level === "level1" ? <NameInput data={data} changeDataHandler={changeDataHandler} />
							:
							level === "level2" ? <CustomerForm user={userData} data={data} getStyles={getStyles} classes={classes}
								theme={theme} changeDataHandler={changeDataHandler} idType={idType} MenuProps={MenuProps}
								names={names} image={image} setImage={setImage} handleChange={handleChange} />
							:<Navigate to='/404'/>
						}
				</Box>
			</Box>
		)
	}
}
const mapStateToProps = state => ({
	userData: state.userData.user
})
const mapDispatchFromprops = dispatch => ({
	addUserData: (data) => dispatch(addUserData(data))
})
export default connect(mapStateToProps, mapDispatchFromprops)(Registerauth);