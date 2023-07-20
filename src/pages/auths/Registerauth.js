import React, { useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material';
import { useStyles, otpStyle } from './style';
import { registerUser } from '../../utils/auth/user';
import { useTheme } from '@mui/material/styles';
import CustomerForm from './CustomerForm';
import NameInput from './NameInput';
import {getDownloadURL, getStorage,ref,uploadBytes} from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../utils/config/firebaseConfig';

const app=initializeApp(firebaseConfig)
const storage=getStorage(app);

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

export default function Registerauth({ setData, user }) {
	
	const [searchParams]=useSearchParams();
	const classes = useStyles();
	const theme = useTheme();

	const [data, setUserData] = useState({ username: user.username, vehicleType: "", customerchargerType: "", vehicleNo: '', idImageURL: null });
	const [image, setImage] = useState(null);
	const [idType, setIdType] = useState('');

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setIdType(value);
	};
	const changeDataHandler = (e) => {
		setUserData({ ...data, [e.target.name]: e.target.value })
	}
	const saveData = async () => {
		if (!user.registeredLevel1) {
			await registerUser({username:data.username,registeredLevel1:true});
			setData({...user,username:data.username,registeredLevel1:true}); 
		} else {
			let downloadURL=null;
			if(image!==null){
				const imageRef=ref(storage,`id_proofs/${image.name}`);
				const uploadResult=await uploadBytes(imageRef,image);
				downloadURL= await getDownloadURL(uploadResult.ref);
			}
			const temp = await registerUser({ ...data,idImageURL:downloadURL, registeredLevel2:true })
			if (temp.error) {
				console.log(temp.error);
			}
			setData({ ...data,...user,registeredLevel2: true ,idImageURL:downloadURL});
		}
	}
	if (user.registeredLevel2 === true) {
		return <Navigate to={`/${searchParams.has("redirectTo")?searchParams.get("redirectTo"):"provider-register"}`} />
	}
	return (
		<Box className={classes.bodyPage}>
			<Box sx={{ position: 'relative' }}>
				<img className={classes.boxBehindImgStyle} src='/resources/light.png' alt='' />
			</Box>
			<Box component='form' onSubmit={(e) => { e.preventDefault(); saveData(); }}  sx={otpStyle.registerBox}>
				<img style={otpStyle.companylogo} src='/resources/light.png' alt='' />
				<Typography className={classes.headOtp}>EVFI</Typography>
				<Typography className={classes.register}>Welcome Back</Typography>
				
				{!user.registeredLevel1 && <NameInput data={data} changeDataHandler={changeDataHandler} />}
				{user.registeredLevel1 && !user.registeredLevel2 && <CustomerForm user={user} data={data} getStyles={getStyles} classes={classes} theme={theme} changeDataHandler={changeDataHandler} idType={idType} MenuProps={MenuProps} names={names} image={image} setImage={setImage} handleChange={handleChange} />}
			</Box>
		</Box>
	)
}