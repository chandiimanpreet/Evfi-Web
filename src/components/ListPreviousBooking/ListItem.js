import React, {  useEffect, useState } from 'react';
import searchedData from '../../utils/searchedData';
// import Ratings from '../Rating';
// import { CurrencyRupee } from '@mui/icons-material';
import { Typography, Box, Button, Chip } from '@mui/material';
import { updateCharger } from '../../utils/auth/user';
import { useStyles } from './style';
import { getParticularUser } from '../../utils/auth/user';

const ListItem = ({ result, user }) => {

	// const { name, location, type, isAvailable, price, rating, img } = result;

	// Constants
	// const navigate = useNavigate();

	// States
	const [requestedChargerData, setRequestedChargerData] = useState(null);

	// Styles
	const classes = useStyles();

	// Handlers

	const fetchData = async () => {
		const res = await getParticularUser(result.uId, result.chargerId);
		setRequestedChargerData(res);
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, []);

	// console.log(requestedChargerData?.charger?.info?.imageUrl[0])

	return (
		<Box className={classes.listItemStyle} sx={{ minWidth: `${searchedData.length > 4 ? '40rem' : '41rem'}`, }}>
			<Box sx={{ borderRadius: '10px', paddingBottom: 0, display: 'flex', }} >
				<Box component='img' sx={{ height: 150, width: 250, borderRadius: '10px 0px 0px 10px', }}
					alt='Charging Station' src={requestedChargerData?.charger?.info?.imageUrl[0]}>
				</Box>
				<Box className={classes.listItemCardStyle}>
					<Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#fff', fontFamily: 'Manrope !important' }}>{requestedChargerData?.charger?.info?.stationName}</Typography>
					<Typography sx={{ fontSize: 13, color: '#bbb', padding: '4px 0px', }}>
						{requestedChargerData?.charger?.info?.address}
					</Typography>
					<Box className={classes.card} sx={{ marginTop: '5px' }}>
						<Box className={classes.card}>
							<Typography className={classes.cardTextStyle} sx={{ marginRight: '4px', }}>Charging Type:{' '}</Typography>
							<Typography className={classes.cardTextStyle} sx={{ fontWeight: 'bold' }}>{requestedChargerData?.charger?.info?.chargerType}</Typography>
						</Box>
						<Box className={classes.card}>
							<Typography className={classes.cardTextStyle} sx={{ marginRight: '4px', }}>Booked Slot:</Typography>
							<Typography className={classes.cardTextStyle} sx={{ fontWeight: 'bold' }}>{result?.timeSlot}</Typography>
						</Box>
					</Box>
					<Box className={classes.card} sx={{ marginTop: '.8rem', padding: '4px 0px', }}>
						<Box className={classes.card} sx={{ marginTop: '.8rem', }}>
							<Typography className={classes.cardTextStyle} sx={{ marginRight: '4px', marginTop: '3px' }}>Status:</Typography>
							<Typography className={classes.cardTextStyle} sx={{ marginRight: '4px', marginTop: '3px' }}>{result?.status}</Typography>
							<Chip label={(result?.status === 1 && 'Requested') || (result?.status === 2 && 'Accepted') || (result?.status === 0 && 'Charging...')
								|| (result?.status === -2 && 'Canceled by you') || (result?.status === -1 && 'Declined by provider') || (result?.status === 3 && 'Charging Completed')}
								color={(result?.status === 1 && 'success') || (result?.status === 2 && 'primary') || (result?.status === 0 && 'secondary')
									|| (result?.status === -2 && 'error') || (result?.status === -1 && 'info') || (result?.status === 3 && 'warning')} size="small" variant="contained" />
						</Box>
						<Box className={classes.card} sx={{ marginTop: '.8rem', }}>
							<Button onClick={() => {
								updateCharger(result.bookingId, -2);
							}} variant="outlined" className={classes.bookAgainBtn}>Cancel</Button>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default ListItem;
