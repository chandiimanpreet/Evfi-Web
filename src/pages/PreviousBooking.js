import React, { useState } from 'react';
import { Box, } from "@mui/material";
import { motion } from 'framer-motion';
import List from '../components/ListPreviousBooking/List';
import DashboardMap from '../components/DashboardMap';

const PreviousBooking = ({ direction, user, userBooking }) => {

	// States
	const [fetchChargerFromList, setFetchChargerFromList] = useState('');

	console.log(userBooking);
	// console.log(fetchChargerFromList);

	return (
		<motion.div key="pb"
			initial={{ x: direction }}
			animate={{ x: 0 }}
			transition={{ duration: 0.25, delay: 0 }}
		>
			<Box sx={{ display: 'flex', width: "100%" }}>
				<Box sx={{ display: { xs: fetchChargerFromList !== '' ? 'none' : 'flex', md: 'flex' }, width: { xs: '100vw', md: '28rem' } }}>
					<List user={user} setFetchChargerFromList={setFetchChargerFromList} userBooking={userBooking} />
				</Box>

				<Box width="100vw" sx={{ display: 'flex', position: { xs: 'fixed', md: 'relative' } }} className="previousBookingPage">
					<DashboardMap collectCardData={setFetchChargerFromList} card={fetchChargerFromList} />
				</Box>
			</Box>
		</motion.div>
	)
}

export default PreviousBooking;