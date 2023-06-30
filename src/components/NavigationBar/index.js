import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ReduceNavigation from './ReduceNavigation';
import ExtendedNavigation from './ExtendedNavigation';

const NavigationBar = ({ searchCoordinates, setSearchCoordinates, setCurrentLocation,
	showRoute }) => {
	//const [inputsCleared, setInputsCleared] = React.useState(false);
	const searchTimeoutRef = useRef(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const [distanceData, setdistanceData] = useState([{ label: 'No Results Found' }]);
	const [autofocusedSource, setAutofocusedSource] = useState(false);
	const [autofocusedDestination, setAutofocusedDestination] = useState(false);
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

		// const { value } = e.target;
		// if (value === "") {
		// 	setInputsCleared(true);
		// 	setSearchCoordinates({
		// 		source: { coordinates: [], label: "" },
		// 		destination: { coordinates: [], label: "" },
		// 	});
		// }
		// else {
		// 	setInputsCleared(false);
		// }

	};



	const handleClose = () => {
		setAnchorEl(null);

	};

	const handleOnclickSource = (event) => {
		setAnchorEl(event.currentTarget);
		setAutofocusedSource(true);
		setAutofocusedDestination(false);
	}

	const handleOnclickDestination = (event) => {
		setAnchorEl(event.currentTarget);
		setAutofocusedSource(false);
		setAutofocusedDestination(true);
	}

	const setPolyline = () => {
		if (searchCoordinates.source.coordinates && searchCoordinates.destination.coordinates) {
			showRoute();
			handleClose();

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
						setCurrentLocation={setCurrentLocation}
					// inputsCleared={inputsCleared}
					/> :
					<ReduceNavigation
						handleOnclickSource={handleOnclickSource}
						handleOnclickDestination={handleOnclickDestination}
						setPolyline={setPolyline}
						searchCoordinates={searchCoordinates}
					/>
			}
		</motion.div>
	);
};
export default NavigationBar;