import { Fragment, useEffect, useState, useMemo } from "react";
import { Badge, Box, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import List from '../components/Request/List';
import Provider from '../components/Registration/Provider';
import Navbar from '../components/Navbar';
import {
	STATUS_CANCELED, STATUS_REQUESTED,
	STATUS_ACCEPTED,
	STATUS_DECLINED,
	STATUS_CHARGING_COMPLETED,
} from '../constants/index'
import { getUserAndChargers } from "../utils/auth/user";
import { Link, useSearchParams } from "react-router-dom";
import { useStyles } from "./style";

const Request = ({ direction, user, moveToPageIndex, bookingRequests }) => {

	// States
	const [show, setShow] = useState("pending");
	const [pendingRequests, setPendingRequests] = useState(null);
	const [recentRequests, setRecentRequests] = useState(null);
	const [searchParams] = useSearchParams();
	// Styles
	const classes = useStyles();

	const pendingRequestsInfo = useMemo(() => {
		return bookingRequests.filter((charger) =>
			charger.status === STATUS_REQUESTED || charger.status === STATUS_ACCEPTED
		);
	}, [bookingRequests]);

	const recentRequestsInfo = useMemo(() => {
		return bookingRequests.filter((charger) =>
			charger.status === STATUS_DECLINED || charger.status === STATUS_CHARGING_COMPLETED || charger.status === STATUS_CANCELED
		);
	}, [bookingRequests]);

	useEffect(() => {
		const helperFunction = async () => {
			const response1 = await Promise.all(pendingRequestsInfo.map(async (charger) => {
				const fetchedChargerRequest = await getUserAndChargers(charger?.uId, charger?.chargerId);
				return [fetchedChargerRequest.user, fetchedChargerRequest.charger.info.chargerType, charger.bookingId, charger.status, charger.timeSlot];
			}));
			setPendingRequests(response1);

			const response2 = await Promise.all(recentRequestsInfo.map(async (charger) => {
				const fetchedChargerRequest = await getUserAndChargers(charger?.uId, charger?.chargerId);
				return [fetchedChargerRequest.user, fetchedChargerRequest.charger.info.chargerType, charger.bookingId, charger.status, charger.timeSlot];
			}));
			setRecentRequests(response2);
		}
		helperFunction();
	}, [pendingRequestsInfo, recentRequestsInfo]);

	console.log(pendingRequests)

	return (
		<motion.div key="lo"
			initial={{ x: direction }}
			animate={{ x: 0 }}
			transition={{ duration: 0.25, delay: 0 }}
		>
			{
				user.level3 === false || searchParams.has('addCharger', 'true') === true ? <Provider /> :
					<Fragment>
						<Box className={classes.bodyPage}>
							<Typography className={classes.heading} variant="h5">Booking Requests</Typography>
							<Box marginX={2} paddingY={2} sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
								<Box sx={{ display: 'flex', gap: '2rem' }} >
			
									<Link className={classes.links} style={{ textDecoration: show === 'pending' ? 'underline' : 'none', }}
										onClick={() => setShow("pending")}>
										Pending
										{
											pendingRequestsInfo.length > 0 && (
												<Badge badgeContent={pendingRequestsInfo.length} color="success" sx={{ top: '-13px', left: '4px' }}
													anchorOrigin={{ vertical: 'top', horizontal: 'right', }} size="small" />)
										}
									</Link>
									<Link className={classes.links} style={{ textDecoration: show === 'recent' ? 'underline' : 'none', }}
										onClick={() => setShow("recent")}>
										Recent
										{
											recentRequestsInfo.length > 0 && (
												<Badge badgeContent={recentRequestsInfo.length} color="success" sx={{ top: '-13px', left: '4px' }}
													anchorOrigin={{ vertical: 'top', horizontal: 'right', }} size="small" variant="dot" />)
										}

									</Link>
								</Box>
								<Divider sx={{ backgroundColor: 'antiquewhite' }} />
								<Grid justifyContent={'center'} container gap={2.5} sx={{ color: '#fff' }}>
									{
										show === "pending" ?
											!pendingRequestsInfo.length > 0 ? 'No New Requests Available' : (
												pendingRequests?.map(([userData, chargerType, bookingId, status, timeSlot]) => ({ userData, chargerType, bookingId, status, timeSlot })).map((request, idx) => (
													<List key={idx} show={show} data={request} />)))
											:
											!recentRequestsInfo.length > 0 ? 'No Recent Requests Available' : (
												recentRequests?.map(([userData, chargerType, bookingId, status, timeSlot]) => ({ userData, chargerType, bookingId, status, timeSlot })).map((request, idx) => (
													<List key={idx} show={show} data={request} />)))
									}
								</Grid><br /><br />
							</Box>
						</Box>
						<Navbar moveToPageIndex={moveToPageIndex} />
					</Fragment>
			}
		</motion.div>
	);
};

export default Request;
