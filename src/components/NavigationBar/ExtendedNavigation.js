import React, { useState } from "react";
import { Box, Popover, TextField, Autocomplete, InputAdornment } from "@mui/material";
import { Bolt as BoltIcon, SwapHorizontalCircle as SwapHorizontalCircleIcon, TravelExploreRounded as TravelExploreRoundedIcon, Tune as TuneIcon, MyLocation as MyLocationIcon } from "@mui/icons-material";
import { motion } from 'framer-motion';
import { useStyles } from "./style";
import { MapContainer, TileLayer } from "react-leaflet";
import "./style.css";
import FindCurrentLocation from "../DashboardMap/FindCurrentLocation";
const ExtendedNavigation = ({ anchorEl,
	handleClose,
	distanceData,
	onChangeRoute,
	setPolyline,
	setSearchCoordinates,
	searchCoordinates,
	autofocusedSource,
	autofocusedDestination,
}) => {

	const [showCurrentLocation, setShowCurrentLocation] = useState(false); // State for showing/hiding current location

	const classes = useStyles();

	const handleShowCurrentLocation = () => {
		setShowCurrentLocation(true);
	};

	return (
		<motion.div>
			<Popover
				id='simple-popover'
				open={true}
				anchorEl={anchorEl}
				onClose={handleClose}
				className={classes.exNavPopover}
				anchorOrigin={{
					vertical: 'center',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'center',
					horizontal: 'center',
				}}
			>
				<Box className={classes.extendnavigationroot}>
					<Box className={classes.bigboltIconRoot}>
						<BoltIcon className={classes.bigboltIcon} />
					</Box>
					<Box className={classes.extendinputroot}>
						<MyLocationIcon className={classes.myLocationIcon} onClick={handleShowCurrentLocation} />
						<Autocomplete
							disablePortal
							id="combo-box-demo"
							options={distanceData}
							className={classes.autocompletestyle}
							sx={{ left: '2.3rem' }}
							renderInput={(params) =>

								<TextField
									{...(autofocusedSource) ? { autoFocus: true } : { autoFocus: false }}
									onChange={onChangeRoute} inputProps={{ sx: { color: '#fff' }, }} className={classes.popDesign} {...params}
									id="destination-textfield"
									placeholder='Source'
								// InputProps={{
								// 	sx: { color: '#fff' },
								// 	startAdornment: (
								// 		<InputAdornment position="start">
								// 			<MyLocationIcon className={classes.myLocationIcon} onClick={handleShowCurrentLocation} />
								// 		</InputAdornment>
								// 	),
								// }}
								/>}
							onChange={(event, newValue) => {
								if (newValue) {
									setSearchCoordinates({ ...searchCoordinates, source: newValue.coordinates })
									console.log(event.coordinates);
									console.log(newValue.coordinates);
								}

							}}
						/>
						<SwapHorizontalCircleIcon className={classes.swapHorizontalCircleIcon} fontSize="large" />
						<Autocomplete
							disablePortal
							id="combo-box-demo"

							options={distanceData}
							data-shrink="false!important"
							className={classes.autocompletestyle}
							sx={{ right: '2.3rem' }}
							renderInput={(params) =>
								<TextField
									{...(autofocusedDestination) ? { autoFocus: true } : { autoFocus: false }}
									onChange={onChangeRoute}
									inputProps={{ sx: { color: '#fff' }, }} className={classes.popDesign} {...params}
									id="destination-textfield"
									placeholder="Destination"
								/>
							}
							onChange={(event, newValue) => {
								if (newValue) {
									setSearchCoordinates({ ...searchCoordinates, destination: newValue.coordinates })
								}
							}}
						/>
						<TravelExploreRoundedIcon onClick={setPolyline} className={classes.travelExploreRoundedIcon} />
					</Box>
				</Box>
				<TuneIcon className={classes.filterdesign} />
			</Popover>
			{showCurrentLocation && <MapContainer center={[29.9695, 76.8783]} zoom={13} scrollWheelZoom={false}>

				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<FindCurrentLocation />

			</MapContainer>}
		</motion.div>
	)
}
export default ExtendedNavigation


