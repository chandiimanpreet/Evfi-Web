import React,{useState} from 'react';
import { Box, } from "@mui/material";
import { motion } from 'framer-motion';
import List from '../components/ListPreviousBooking/List';
import DashboardMap from '../components/DashboardMap';
import searchedData from '../components/ListPreviousBooking/searchedData';

const PreviousBooking = ({ direction }) => {

	//States
	const [newCard, setNewCard] = useState('');

	//Handlers
	const getData = (data) => {
		setNewCard(data);
	};
	
	return (
		<motion.div key="pb"
			initial={{ x: direction.direction === 1 ? "100vw" : "-100vw" }}
			animate={{ x: 0 }}
			transition={{ duration: 0.25, delay: 0 }}
		>
			<Box sx={{ display: 'flex', }}>
				<Box>
					<List searchedData={searchedData} collectCardData={getData} />
				</Box>
				<Box>
					<DashboardMap card={newCard} />
				</Box>
			</Box>
		</motion.div>
	)
}

export default PreviousBooking;
