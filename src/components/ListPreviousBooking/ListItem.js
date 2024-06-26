import React from 'react';
// import Ratings from '../Rating';
// import { CurrencyRupee } from '@mui/icons-material';
import { Typography, Box, Button, Chip, Skeleton } from '@mui/material';
import { convertTimeforUserUI, updateBookedCharger,getORUpdateTimeSlotOFCharger } from '../../utils/auth/user';
import { useStyles } from './style';
import {
	STATUS_CANCELED, STATUS_REQUESTED,
	STATUS_ACCEPTED,
	STATUS_DECLINED,
	STATUS_CHARGING_COMPLETED,
	STATUS_CHARGING,
} from '../../constants';

const ListItem = ({ data, show }) => {
	console.log(data)

	// Styles
	const classes = useStyles();

	const cancelBooking = () => {
		updateBookedCharger(data.bookingId, STATUS_CANCELED);
		const unSetDesiredBit = 1 << data.timeSlot;
		const newTiming = unSetDesiredBit ^ data.chargerData.timeSlot;
		getORUpdateTimeSlotOFCharger(data.chargerData.chargerId, newTiming);
	};

	return (
		<Box className={classes.listItemStyle} sx={{
			paddingBottom: ['0rem', '0.6rem']
		}}>
			<Box display='flex'>
				<Box component='img' sx={{ height: { xs: "8.5rem", md: "9rem" }, width: { xs: "7rem", md: "10rem" }, borderRadius: '10px 0px 0px 10px', }}
					alt='Charging Station' src={data.chargerData?.info?.imageUrl[0]}>
				</Box>

				<Box sx={{ width: ['11.2rem', '12rem', '15rem'] }} className={classes.listItemCardStyle}>
					<Typography sx={{ fontSize: { xs: '0.85rem', md: '1.05rem' }, fontWeight: 'bold', color: '#fff', fontFamily: 'Manrope !important' }}>{data.chargerData?.info?.stationName}</Typography>

					<Box><Typography whiteSpace='initial' className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
						{data.chargerData?.info?.address || <Skeleton width={250} animation="wave" />}</Typography>
					</Box>

					<Box display="flex" justifyContent="flex-start">
						<Typography className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, marginRight: '4px', textOverflow: 'unset !important' }}>Type:</Typography>
						<Typography className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, fontWeight: "bold" }}>
							{data.chargerData?.info?.chargerType || <Skeleton width={20} animation="wave" />}
						</Typography>
					</Box>

					<Box display="flex" justifyContent="flex-start">
						<Typography className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, marginRight: '4px', textOverflow: 'unset !important' }}>Price:</Typography>
						<Typography className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, fontWeight: "bold" }}>
							{data.price || <Skeleton width={20} animation="wave" />}
						</Typography>
					</Box>

					<Box display="flex" justifyContent="flex-start">
						<Typography className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, marginRight: '4px', textOverflow: 'unset !important' }}>Slot:</Typography>
						<Typography className={classes.cardTextStyle} sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, fontWeight: "bold" }}>
							{convertTimeforUserUI(data?.timeSlot) || <Skeleton width={50} animation="wave" />}
						</Typography>
					</Box>

					<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
						<Chip
							label={
								(data?.status === STATUS_REQUESTED && 'Requested') ||
								(data?.status === STATUS_ACCEPTED && 'Accepted') ||
								(data?.status === STATUS_CHARGING && 'Charging...') ||
								(data?.status === STATUS_CANCELED && 'Canceled by you') ||
								(data?.status === STATUS_DECLINED && 'Declined by provider') ||
								(data?.status === STATUS_CHARGING_COMPLETED && 'Charging Completed')
							}
							color={
								(data?.status === STATUS_REQUESTED && 'success') ||
								(data?.status === STATUS_ACCEPTED && 'primary') ||
								(data?.status === STATUS_CHARGING && 'secondary') ||
								(data?.status === STATUS_CANCELED && 'error') ||
								(data?.status === STATUS_DECLINED && 'error') ||
								(data?.status === STATUS_CHARGING_COMPLETED && 'warning')
							}
							size="small" variant='outlined' sx={{ fontSize: { xs: '0.6rem', md: '0.8rem' }, height: { xs: '1.2rem', md: '1.5rem' }, fontWeight: 'bold', border: '2.5px solid', marginRight: 'auto' }} />
						{
							show === 'pending' && (

								<Button size='small' sx={{ fontSize: { xs: '0.5rem', md: '0.7rem' }, height: { xs: '1.2rem', md: '1.5rem' }, fontWeight: 'bold' }} onClick={(e) => {
									e.stopPropagation();
									updateBookedCharger(data.bookingId, STATUS_CANCELED);
									cancelBooking();
								}} className={classes.cancelBtn}>Cancel</Button>
							)
						}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default ListItem;
