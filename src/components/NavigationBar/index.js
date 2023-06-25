import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ReduceNavigation from './ReduceNavigation';
import ExtendedNavigation from './ExtendedNavigation';
import "./style.css";

const NavigationBar = ({ searchCoordinates, setSearchCoordinates, showRoute, showMyLocation, mapRef, LocationMarker }) => {
	const searchTimeoutRef = useRef(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const [distanceData, setdistanceData] = useState([{ label: 'No Results Found' }]);
	const [autofocusedSource, setAutofocusedSource] = useState(false);
	const [autofocusedDestination, setAutofocusedDestination] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');
	const [textFieldfill, settextFieldfill] = useState(false);
	const onChangeRoute = async (e) => {
		// if  exitst searchTimeout

		clearTimeout(searchTimeoutRef.current);
		//create new timeout using the settimeout  extract data and store it in the setdistanceData
		const url = 'https://nominatim.openstreetmap.org/search?format=geojson&limit=5&q';
		searchTimeoutRef.current = setTimeout(async () => {
			try {
				const response = await axios.get(`${url}=${encodeURI(e.target.value)}`);
				let results = response.data.features.map((ele) => ({
					coordinates: ele.geometry.coordinates,
					label: ele.properties.display_name
				}));
				setdistanceData(results);
			} catch (error) {
				console.error(error);
			}
		}, 500);
		setSelectedValue(e.target.value);
	};
	console.log(selectedValue);

	const handleClose = () => {
		setAnchorEl(null);
		settextFieldfill(true);
	};

	const handleOnclickSource = (event) => {
		setAnchorEl(event.currentTarget);
		setAutofocusedSource(true);
		setAutofocusedDestination(false);
		console.log(event.currentTarget);

	}

	const handleOnclickDestination = (event) => {
		setAnchorEl(event.currentTarget);
		setAutofocusedSource(false);
		setAutofocusedDestination(true);
		console.log(event.currentTarget);
	}

	const setPolyline = () => {
		if (searchCoordinates.source && searchCoordinates.destination) {
			showRoute();
			handleClose()
		}
		else {
			window.alert("please fill the source and destination");
		}
	}

	return (
		<motion.div>
			{
				anchorEl ?
					<ExtendedNavigation
						anchorEl={anchorEl}
						handleClose={handleClose}
						distanceData={distanceData}
						onChangeRoute={onChangeRoute}
						setPolyline={setPolyline}
						setSearchCoordinates={setSearchCoordinates}
						searchCoordinates={searchCoordinates}
						autofocusedSource={autofocusedSource}
						autofocusedDestination={autofocusedDestination}
					/> :
					<ReduceNavigation
						handleOnclickSource={handleOnclickSource}
						handleOnclickDestination={handleOnclickDestination}
						selectedValue={selectedValue}
						textFieldfill={textFieldfill}
					/>
			}
		</motion.div>
	);
};
export default NavigationBar;


