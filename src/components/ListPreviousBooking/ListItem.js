import React from 'react';
// import Ratings from '../Rating';
// import { CurrencyRupee } from '@mui/icons-material';
import { Typography, Box, Button, Chip } from '@mui/material';
import { updateCharger } from '../../utils/auth/user';
import { useStyles } from './style';
import {
	STATUS_CANCELED, STATUS_REQUESTED,
	STATUS_ACCEPTED,
	STATUS_DECLINED,
	STATUS_CHARGING_COMPLETED,
	STATUS_CHARGING,
} from '../../constants';

const ListItem = ({ data, show }) => {

	// Styles
	const classes = useStyles();

	return (
		<Box className={classes.listItemStyle} sx={{ minWidth: '30rem' }}>
			<Box sx={{ borderRadius: '10px', paddingBottom: 0, display: 'flex', }} >
				<Box component='img' sx={{ height: 150, width: 250, borderRadius: '10px 0px 0px 10px', }}
					alt='Charging Station' src={data.chargerData?.info?.imageUrl[0]}>
				</Box>
				<Box className={classes.listItemCardStyle}>
					<Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#fff', fontFamily: 'Manrope !important' }}>{data.chargerData?.info?.stationName}</Typography>
					<Typography sx={{ fontSize: 13, color: '#bbb', padding: '4px 0px', }}>
						{data.chargerData?.info?.address}
					</Typography>
					<Box className={classes.card} sx={{ marginTop: '5px' }}>
						<Box className={classes.card}>
							<Typography className={classes.cardTextStyle} sx={{ marginRight: '4px', }}>Charging Type:{' '}</Typography>
							<Typography className={classes.cardTextStyle} sx={{ fontWeight: 'bold' }}>{data.chargerData?.info?.chargerType}</Typography>
						</Box>
						<Box className={classes.card}>
							<Typography className={classes.cardTextStyle} sx={{ marginRight: '4px', }}>Booked Slot:</Typography>
							<Typography className={classes.cardTextStyle} sx={{ fontWeight: 'bold' }}>{data?.timeSlot}</Typography>
						</Box>
					</Box>
					<Box className={classes.card} sx={{ marginTop: '.8rem', padding: '4px 0px', }}>
						<Box className={classes.card} sx={{ marginTop: '.8rem', }}>
							<Chip label={(data?.status === STATUS_REQUESTED && 'Requested') || (data?.status === STATUS_ACCEPTED && 'Accepted') || (data?.status === STATUS_CHARGING && 'Charging...')
								|| (data?.status === STATUS_CANCELED && 'Canceled by you') || (data?.status === STATUS_DECLINED && 'Declined by provider') || (data?.status === STATUS_CHARGING_COMPLETED && 'Charging Completed')}
								color={(data?.status === STATUS_REQUESTED && 'success') || (data?.status === STATUS_ACCEPTED && 'primary') || (data?.status === STATUS_CHARGING && 'secondary')
									|| (data?.status === STATUS_CANCELED && 'error') || (data?.status === STATUS_DECLINED && 'info') || (data?.status === STATUS_CHARGING_COMPLETED && 'warning')} size="small" variant="contained" />
						</Box>
						{
							show === 'pending' && (
								<Box className={classes.card} sx={{ marginTop: '.8rem', }}>
									<Button onClick={(e) => {
										e.stopPropagation();
										updateCharger(data.bookingId, STATUS_CANCELED);
									}} variant="outlined" className={classes.bookAgainBtn}>Cancel</Button>
								</Box>
							)
						}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default ListItem;
