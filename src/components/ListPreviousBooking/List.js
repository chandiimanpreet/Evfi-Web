import React, { useState, Fragment } from 'react';
import ListItem from './ListItem';
import FavoriteListItem from './FavouriteItem';
import FilterGroup from '../Filters/FilterGroup';
import { chargerTypeOptions, sortByOptions } from '../../constants';
import {
	FormControl, InputAdornment, Input, Accordion, AccordionDetails, Button, AccordionSummary, Box,
	Typography, Tab
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Search, FilterList, Clear, } from '@mui/icons-material';
import { useStyles } from './style';

const List = (props) => {

	//States
	const [showFilter, setShowFilter] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState({
		chargerType: [],
		sortBy: '',
		from: null,
		to: null,
	});

	const [tabValue, setTabValue] = useState('1');

	//Styling
	const classes = useStyles();

	//Handlers
	const toggleFilter = () => setShowFilter(!showFilter);

	const filterHandler = (key, value) => {
		setSelectedFilters(filter => ({
			...filter, [key]: value,
		}))
	};

	const clearFilters = () => {
		setSelectedFilters(() => ({
			chargerType: [],
			sortBy: '',
			from: null,
			to: null,
		}))
	};

	const handleChange = (event, newValue) => {
		setTabValue(newValue);
	};

	return (
		<Fragment>
			<Box className={classes.outerBox} >
				<Box  >
					<Box sx={{ padding: '11px 8px 2px 8px', display: 'flex', justifyContent: 'space-between', }} >
						<FormControl variant="standard" fullWidth>
							<Input placeholder='Search Charging Stations...' className={classes.inputField}
								startAdornment={<InputAdornment position="start" >
									<Search sx={{ paddingLeft: '10px', color: '#282828' }} /></InputAdornment>}
							/>
						</FormControl>
						<Box sx={{ display: 'flex', cursor: 'pointer', paddingTop: '5px', }} onClick={toggleFilter}>
							<FilterList className={classes.filterIconStyle} />
						</Box>
					</Box>

					<Box sx={{ marginLeft: '8px', marginTop: '5px', marginBottom: showFilter ? '9px' : '0px', }}>
						<Accordion expanded={showFilter} sx={{ width: '98%' }}>
							<AccordionSummary sx={{ display: 'none' }}>
							</AccordionSummary>
							<AccordionDetails >
								<Box sx={{ display: 'flex', flexDirection: 'column', padding: '4px 5px', }}>
									<Box sx={{ fontSize: '14px', }}>
										<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
											<Box>
												<Typography mb={1} className={classes.filterHeadersStyle} >Charger Type</Typography>
												<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
													<FilterGroup options={chargerTypeOptions} type='multi'
														property='chargerType' selected={selectedFilters.chargerType} setSelected={filterHandler} />
												</Box>
											</Box>
											<Box>
												<Typography mb={1} className={classes.filterHeadersStyle}>Sort</Typography>
												<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, }}>
													<FilterGroup options={sortByOptions} type='solo'
														property='sortBy' selected={selectedFilters.sortBy} setSelected={filterHandler} />
												</Box>
											</Box>
											<Box>
												<Button onClick={() => { clearFilters() }} >Clear All <Clear /> </Button>
											</Box>
										</Box>
									</Box>

									<Box sx={{ marginTop: '13px', }}>
										<Typography className={classes.filterHeadersStyle} >Date</Typography>
										<Box sx={{ display: 'flex' }}>
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<DemoContainer components={['DatePicker']}>
													<DatePicker label="To" sx={{ marginRight: '15px' }} value={selectedFilters.to}
														onChange={(newValue) => filterHandler('to', newValue)} />
												</DemoContainer>
											</LocalizationProvider>

											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<DemoContainer components={['DatePicker']} sx={{ borderColor: 'red !important' }} >
													<DatePicker label="From" value={selectedFilters.from} sx={{ borderColor: 'yellow !important', '& .input': { padding: '10rem !important' } }}
														onChange={(newValue) => filterHandler('from', newValue)} />
												</DemoContainer>
											</LocalizationProvider>
										</Box>
									</Box>

									<Box sx={{ marginTop: '13px', }}>

									</Box>
								</Box>
							</AccordionDetails>
						</Accordion>
					</Box>

					<Box>
						<TabContext value={tabValue}>
							<Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '4px', }}>
								<TabList onChange={handleChange}  className={classes.tabStyle}>
									<Tab label="Previous Booking" value="1" sx={{ textTransform: 'none', }} />
									<Tab label="Favourites" value="2" sx={{ textTransform: 'none', }} />
								</TabList>
							</Box>
							<TabPanel value="1" sx={{ padding: '0px' }}>
								<Box className={classes.searchResultsContainer}>
									{props.searchedData.map((result) => (
										<ListItem key={result.id} result={result} />
									))}
								</Box>
							</TabPanel>
							<TabPanel value="2" sx={{ padding: '0px' }}>
								<Box className={classes.searchResultsContainer}>
									{props.searchedData.map((result) => (
										<FavoriteListItem key={result.id} result={result} />
									))}
								</Box>
							</TabPanel>
						</TabContext>
					</Box>
				</Box>
			</Box>
		</Fragment >
	);
};

export default List;