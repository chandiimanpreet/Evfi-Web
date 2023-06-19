import React, { useState, Fragment } from 'react';
import ListResultsItem from './ListItem';
import FilterGroup from '../Filters/FilterGroup';
import { chargerTypeOptions, sortByOptions } from '../../constants';
import {
	FormControl, InputAdornment, Input, Accordion, AccordionDetails, Button, AccordionSummary, Box,
	Typography,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Search, FilterList, Clear } from '@mui/icons-material';
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
	}

	return (
		<Fragment>
			<Box className={classes.outerBox} >
				<Box  >
					<Box sx={{ padding: '11px 8px', display: 'flex', justifyContent: 'space-between', }} >
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

					<Box sx={{ marginLeft: '8px', marginBottom: '8px', }}>
						<Accordion expanded={showFilter} sx={{ width: '98%' }}>
							<AccordionSummary sx={{ display: 'none' }}>
							</AccordionSummary>
							<AccordionDetails >
								<Box sx={{ display: 'flex', flexDirection: 'column', padding: '4px 5px', }}>
									<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', fontSize: '14px', }}>
										<Box>
											<Box sx={{ display: 'flex', }}>
												<Typography mb={1} className={classes.filterHeadersStyle} >Charger Type</Typography>
												<Button sx={{ position: 'absolute', right: '1rem', }} onClick={() => { clearFilters() }} >Clear All <Clear /> </Button>
											</Box>
											<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
												<FilterGroup options={chargerTypeOptions} type='multi'
													property='chargerType' selected={selectedFilters.chargerType} setSelected={filterHandler} />
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
										<Typography mb={1} className={classes.filterHeadersStyle}>Sort</Typography>
										<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, }}>
											<FilterGroup options={sortByOptions} type='solo'
												property='sortBy' selected={selectedFilters.sortBy} setSelected={filterHandler} />
										</Box>
									</Box>
								</Box>
							</AccordionDetails>
						</Accordion>
					</Box>

					<Box className={classes.searchResultsContainer}>
						{props.searchedData.map((result) => (
							<ListResultsItem key={result.id} result={result} />
						))}
					</Box>
				</Box>
			</Box>
		</Fragment >
	);
};

export default List;