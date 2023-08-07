import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ReduceNavigation from './ReduceNavigation';
import ExtendedNavigation from './ExtendedNavigation';
import { saveQuery } from '../../utils/queries/searchQueries';
import PlaceSearchingNavigationbar from './PlaceSearchingNavigationbar';
const NavigationBar = ({ searchCoordinates, setSearchCoordinates, setCurrentLocation,
	showRoute, searchLocationCoordinates, setSearchLocationCoordinates, setShow }) => {
	const searchTimeoutRef = useRef(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const [distanceData, setdistanceData] = useState([{ label: 'No Results Found' }]);
	const [autofocusedSource, setAutofocusedSource] = useState(false);
	const [autofocusedDestination, setAutofocusedDestination] = useState(false);
	const [showPlaceSearching, setShowPlaceSearching] = useState(true);
	const [showExtendedNavigation, setShowExtendedNavigation] = useState(false);
	const [showRadiusNavigation, setShowRadiusNavigation] = useState(false);


	const onChangeRoute = async (e) => {
		// if exit searchTimeout
		clearTimeout(searchTimeoutRef.current);

		// create new timeout using setTimeout, extract data and store it in setdistanceData
		const url = 'https://nominatim.openstreetmap.org/search?format=geojson&limit=5&q';
		searchTimeoutRef.current = setTimeout(async () => {
			try {
				const response = await fetch(`${url}=${encodeURI(e.target.value)}`);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const responseData = await response.json();
				const results = responseData.features.map((ele) => ({
					coordinates: ele.geometry.coordinates,
					label: ele.properties.display_name
				}));
				setdistanceData(results);
			} catch (error) {
				console.error(error);
			}
		}, 500);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setShowPlaceSearching(true);
		setShowExtendedNavigation(false);
		setShowRadiusNavigation(false);
	};

	const handleOnclickSource = (event) => {
		setAnchorEl(event.currentTarget);
		setAutofocusedSource(true);
		setAutofocusedDestination(false);

		setShowPlaceSearching(false);
		setShowExtendedNavigation(true);
		setShowRadiusNavigation(false);
	}

	const handleOnclickDestination = (event) => {
		setAnchorEl(event.currentTarget);
		setAutofocusedSource(false);
		setAutofocusedDestination(true);

		setShowPlaceSearching(false);
		setShowExtendedNavigation(true);
		setShowRadiusNavigation(false);
	}


	const handleOnclickSearchLocation = () => {
		setShowPlaceSearching(true);
		setShowRadiusNavigation(false);
		setShow(false)
		setSearchCoordinates({
			source: { coordinates: null, label: '' },
			destination: { coordinates: null, label: '' }
		})
	}


	const setPolyline = async () => {
		if (searchCoordinates.source.coordinates && searchCoordinates.destination.coordinates) {
			await saveQuery({ start: searchCoordinates.source.coordinates, end: searchCoordinates.destination.coordinates });
		}
		if (searchCoordinates.source.coordinates || searchCoordinates.destination.coordinates) {
			showRoute();
			handleClose();
			setShowPlaceSearching(false);
			setShowExtendedNavigation(false);
			setShowRadiusNavigation(true);
		}
	}
	return (
		<motion.div>
			{showPlaceSearching && (
				<PlaceSearchingNavigationbar
					handleOnclickSource={handleOnclickSource}
					distanceData={distanceData}
					onChangeRoute={onChangeRoute}
					searchLocationCoordinates={searchLocationCoordinates}
					setSearchLocationCoordinates={setSearchLocationCoordinates}
					searchCoordinates={searchCoordinates}
					setSearchCoordinates={setSearchCoordinates}
				/>
			)}

			{showExtendedNavigation && (
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
					searchLocationCoordinates={searchLocationCoordinates}
					setSearchLocationCoordinates={setSearchLocationCoordinates}
				/>
			)}
			{showRadiusNavigation && (
				<ReduceNavigation
					handleOnclickSource={handleOnclickSource}
					handleOnclickDestination={handleOnclickDestination}
					setPolyline={setPolyline}
					searchCoordinates={searchCoordinates}
					handleOnclickSearchLocation={handleOnclickSearchLocation}
				/>
			)}
		</motion.div>
	);
};
export default NavigationBar;