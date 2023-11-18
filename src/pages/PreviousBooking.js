import React, { useState } from 'react';
import { Box, } from "@mui/material";
import { motion } from 'framer-motion';
import List from '../components/ListPreviousBooking/List';
import DashboardMap from '../components/DashboardMap';

const PreviousBooking = ({ direction, user, userBooking }) => {

	// States
	const [fetchChargerFromList, setFetchChargerFromList] = useState('');

	console.log(userBooking)

	return (
		<motion.div key="pb"
			initial={{ x: direction }}
			animate={{ x: 0 }}
			transition={{ duration: 0.25, delay: 0 }}
		>
			<Box sx={{ display: 'flex', width: "100%" }}>
				<List user={user} setFetchChargerFromList={setFetchChargerFromList} userBooking={userBooking} />
				<Box width="100%" position="relative" className="previousBookingPage">
					<DashboardMap card={fetchChargerFromList} />
				</Box>
			</Box>
		</motion.div>
	)
}

export default PreviousBooking;