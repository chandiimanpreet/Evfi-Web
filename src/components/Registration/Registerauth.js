import { useState } from 'react';
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
import BoltIcon from '@mui/icons-material/Bolt';

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

const Registerauth = ({ addUserData, userData }) => {
	const classes = useStyles();
	const theme = useTheme();

	const { level } = useParams();
	const [searchParams] = useSearchParams();
	const app = initializeApp(firebaseConfig)
	const storage = getStorage(app);

	const [data, setUserData] = useState({
		vehicleManufacturer: "",
		chargingRequirements: "",
		vehicleNumber: '',
		mileage: '',
		batteryCapacity: ''
	});

	const [image, setImage] = useState(null);
	const [idType, setIdType] = useState('');
	
	const handleNameChange = async (name) => {
        console.log('Name changed:', name);
		await registerUser({ firstName: name, level1: true });
    	addUserData({ firstName: name, level1: true });
		console.log(data)
		console.log(userData)
    };

	const handleChange = (event) => {
		setIdType(event.target.value);
	};

	const changeDataHandler = (e) => {
		setUserData({ ...data, [e.target.name]: e.target.value })
		console.log(data)
		console.log(userData)
	};

	const saveData = async () => {
			let downloadURL = null;
			if (image !== null) {
				const imageRef = ref(storage, `id_proofs/${image.name}`);
				const uploadResult = await uploadBytes(imageRef, image);
				downloadURL = await getDownloadURL(uploadResult.ref);
			}
			const temp = await registerUser({ level2: { ...data, userIdProofURL: downloadURL } })
			if (temp.error) {
				console.log(temp.error);
			}
			addUserData({ level2: { ...data, userIdProofURL: downloadURL } })
		// }
	}
	if (!userData) {
		return <Navigate to={'/auth'} />
	} else if (level === "level1" && userData.level1) {
		if (!userData.level2) {
			return <Navigate to={'/register/level2'} />
		}
		console.log("first level")
		return <Navigate to={'/'} />
	} else if (level === "level2" && userData.level2) {
		return <Navigate to={`/${searchParams.has("redirectTo") ? searchParams.get("redirectTo") : ""}`} />
	} else {
		return (
			<Box className={classes.bodyPage}>
				<Box sx={{ position: 'relative' }}>
					<img className={classes.boxBehindImgStyle} src='/resources/light.png' alt='' />
				</Box>
				<Box component='form' onSubmit={(e) => { e.preventDefault(); saveData(); }} sx={otpStyle.registerBox}>
					<Box>
						<BoltIcon
							sx={{
								marginLeft: "7.5rem",
								color: "yellow",
								width: "3rem",
								height: "3rem",
								fontSize: { xs: "1.3rem", sm: "2.3rem" },
							}}
						/>
					</Box>

					<Typography color='#fff' textAlign='center' fontFamily='Manrope !important' fontWeight='bold' fontSize='1.8rem'>EVFI</Typography>

					<Typography color='#fff' textAlign='center' fontSize='1.4rem' fontWeight='500' marginBottom='1.5rem'>Welcome Back</Typography>
					{
						level === "level1" ? <NameInput onNameChange={handleNameChange} />
							:
							level === "level2" ? <CustomerForm user={userData} data={data} getStyles={getStyles} classes={classes}
								theme={theme} changeDataHandler={changeDataHandler} idType={idType} MenuProps={MenuProps}
								names={names} image={image} setImage={setImage} handleChange={handleChange} />
								: <Navigate to='/404' />
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