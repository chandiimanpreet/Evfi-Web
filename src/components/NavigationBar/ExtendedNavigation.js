import React from 'react'
import { Box, Popover, TextField, Autocomplete } from "@mui/material";
import { Bolt as BoltIcon, SwapHorizontalCircle as SwapHorizontalCircleIcon, TravelExploreRounded as TravelExploreRoundedIcon, Tune as TuneIcon } from "@mui/icons-material";
import { motion } from 'framer-motion';
import { useStyles } from "./style";
const ExtendedNavigation = ({ anchorEl, handleClose, distanceData, onChangeRoute, setPolyline, setSearchCoordinates, searchCoordinates }) => {
	const classes = useStyles();
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
				}} transformOrigin={{
					vertical: 'center',
					horizontal: 'center',
				}}
			>
				<Box className={classes.extendnavigationroot}>
					<Box className={classes.bigboltIconRoot}>
						<BoltIcon className={classes.bigboltIcon} />
					</Box>
					<Box className={classes.extendinputroot}>
						<Autocomplete
							disablePortal
							id="combo-box-demo"
							options={distanceData}
							className={classes.autocompletestyle}
							sx={{ left: '2.3rem' }}
							renderInput={(params) => <TextField onChange={onChangeRoute} inputProps={{ sx: { color: '#fff' }, }} className={classes.popDesign} {...params} label="Source" />}
							onChange={(event, newValue) => {
								setSearchCoordinates({ ...searchCoordinates, source: newValue.coordinates })
								console.log(event.coordinates);
								console.log(newValue.coordinates);
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
								<TextField onChange={onChangeRoute}
									inputProps={{ sx: { color: 'white' }, }} className={classes.popDesign} {...params} label="Destination"
								/>
							}
							onChange={(event, newValue) => {
								setSearchCoordinates({ ...searchCoordinates, destination: newValue.coordinates })
							}}
						/>
						<TravelExploreRoundedIcon onClick={setPolyline} className={classes.travelExploreRoundedIcon} />
					</Box>
				</Box>
				<TuneIcon className={classes.filterdesign} />
			</Popover>
		</motion.div>
	)
}
export default ExtendedNavigation
