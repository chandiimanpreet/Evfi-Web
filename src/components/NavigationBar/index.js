import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, Popover, TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from "@mui/material";
import { Bolt as BoltIcon, } from "@mui/icons-material";
// import SearchIcon from '@mui/icons-material/Search';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import { useStyles } from "./style";
// import './style.css'


// for searchbar

const NavigationBar = () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<AppBar
			className={classes.navigation}
		>

			<Toolbar sx={{ display: 'flex', justifyContent: 'space-around', width: "100%", padding: "0.1rem" }}  >
				<Button aria-describedby={id} onClick={handleClick} className={classes.inputBtns} >
					Source
				</Button>

				<BoltIcon className={classes.boltIcon} />

				<Button aria-describedby={id} onClick={handleClick} className={classes.inputBtns}>
					Destination
				</Button>

				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}} transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}} sx={{ top: '-65px', }}
				>
					<Box sx={{
						width: '100vw',
						height: '13rem',
						backgroundColor: '#282828',
						display: 'flex',
						justifyContent: 'center',
					}}>
						<Box sx={{ marginTop: '20px', display: 'block', }} >
							<TextField label="Source" inputProps={{ sx: { color: '#fff' }, }} className={classes.popDesign} />
							<SwapHorizontalCircleIcon sx={{ color: '#fff', cursor: 'pointer', marginRight: '5px', marginLeft: '5px', marginTop: '10px', }} fontSize="large" />
							<TextField label="Destination" inputProps={{ sx: { color: '#fff' }, }} className={classes.popDesign} />
							<Button variant="contained" sx={{ marginLeft: '10px', marginTop: '11px', color: '#282828', backgroundColor: 'yellow' }}>Search</Button>
						</Box>
						<Box sx={{ marginTop: '20px', display: 'block', }}>
							<FormControl>
								<FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: '#fff' }}>Chargers Type</FormLabel>
								<RadioGroup
									row
									aria-labelledby="demo-row-radio-buttons-group-label"
									name="row-radio-buttons-group"
								>
									<FormControlLabel value="Type A" control={<Radio sx={{ color: '#fff' }} />} label="Type A" sx={{ color: '#fff' }} />
									<FormControlLabel value="Type B" control={<Radio sx={{ color: '#fff' }} />} label="Type B" sx={{ color: '#fff' }} />
									<FormControlLabel value="Type C" control={<Radio sx={{ color: '#fff' }} />} label="Type C" sx={{ color: '#fff' }} />
								</RadioGroup>
							</FormControl>
						</Box>
					</Box>
				</Popover>
			</Toolbar>
		</AppBar >
	);
};
export default NavigationBar;
