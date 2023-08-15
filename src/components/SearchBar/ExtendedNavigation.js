import React from "react";
import { Box, Popover, TextField, Autocomplete } from "@mui/material";
import { Bolt as BoltIcon, SwapHorizontalCircle as SwapHorizontalCircleIcon, Tune as TuneIcon, MyLocation as MyLocationIcon } from "@mui/icons-material";
import { motion } from 'framer-motion';
import { useStyles } from "./style";

const ExtendedNavigation = ({
	anchorEl, handleClose, distanceData, onChangeRoute, setSearchCoordinates, searchCoordinates,
	autofocusedSource, autofocusedDestination, setCurrentLocation, }) => {

	// Styles
	const classes = useStyles();

	return (
		<motion.div>
			<Popover id='simple-popover' open={true} anchorEl={anchorEl} onClose={handleClose}
				className={classes.exNavPopover} anchorOrigin={{
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
						<MyLocationIcon className={classes.myLocationIcon} onClick={() => setCurrentLocation(true)} />
						<Autocomplete disablePortal id="combo-box-demo" options={distanceData}
							value={searchCoordinates.source.label} className={classes.autocompletestyle}
							sx={{ left: '2.3rem' }}
							renderInput={(params) =>
								<TextField
									{...(autofocusedSource) ? { autoFocus: true } : { autoFocus: false }}
									onChange={onChangeRoute} inputProps={{ sx: { color: '#fff' }, maxLength: 12 }} className={classes.popDesign} {...params}
									id="destination-textfield"
									placeholder='Source'
								/>}
							onChange={(event, newValue) => {
								if (newValue) {
									console.log(newValue);
									setSearchCoordinates({ ...searchCoordinates, source: { coordinates: newValue.coordinates, label: newValue.label } })
								}

							}}
						/>
						<SwapHorizontalCircleIcon className={classes.swapHorizontalCircleIcon} fontSize="large" />
						<Autocomplete disablePortal id="combo-box-demo" options={distanceData}
							value={searchCoordinates.destination.label} data-shrink="false!important"
							className={classes.autocompletestyle} sx={{ right: '2.3rem' }}
							renderInput={(params) =>
								<TextField
									value={searchCoordinates.destination.label}
									{...(autofocusedDestination) ? { autoFocus: true } : { autoFocus: false }}
									onChange={onChangeRoute}
									inputProps={{ sx: { color: '#fff' }, maxLength: 12 }}
									className={classes.popDesign} {...params}
									id="destination-textfield"
									placeholder="Destination"

								/>
							}
							onChange={(event, newValue) => {
								if (newValue) {
									setSearchCoordinates({
										...searchCoordinates, destination: {
											coordinates: newValue.coordinates,
											label: newValue.label,
										}
									})
								}
							}}
						/>

					</Box>
				</Box>
				<TuneIcon className={classes.filterdesign} />
			</Popover>
		</motion.div>
	)
}

export default ExtendedNavigation;

