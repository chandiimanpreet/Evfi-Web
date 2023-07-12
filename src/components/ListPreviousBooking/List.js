import React, { useEffect, useState, Fragment, } from 'react';
import ListItem from './ListItem';
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

import { Search, FilterList, Clear, } from '@mui/icons-material';
import { useStyles } from './style';

const List = ({ searchedData, collectCardData }) => {

	//States
	const [showFilter, setShowFilter] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState({
		chargerType: [],
		sortBy: '',
		from: null,
		to: null,
	});
	const [cardData, setCardData] = useState('');

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

	const handleCardData = (result) => { setCardData(result); };

	useEffect(() => {
		collectCardData(cardData);
		// eslint-disable-next-line
	}, [cardData]);

	return (
		<Fragment>
			<Box className={classes.outerBox} >
				<Box>
					<Box sx={{ padding: '11px 8px 2px 8px', display: 'flex', justifyContent: 'space-between', }} >
						<FormControl variant="standard" fullWidth>
							<Input placeholder='Search Charging Stations...' className={classes.inputField}
								startAdornment={<InputAdornment position="start" >
									<Search sx={{ paddingLeft: '10px', color: '#fff' }} /></InputAdornment>}
							/>
						</FormControl>
						<Box sx={{ display: 'flex', cursor: 'pointer', paddingTop: '5px', }} onClick={toggleFilter}>
							<FilterList className={classes.filterIconStyle} />
						</Box>
					</Box>

					<Box sx={{ marginLeft: '8px', marginTop: '6px', marginBottom: showFilter ? '4px' : '0px', }}>
						<Accordion expanded={showFilter} sx={{ width: '98%' }}>
							<AccordionSummary sx={{ display: 'none' }}>
							</AccordionSummary>
							<AccordionDetails >
								<Box sx={{ display: 'flex', flexDirection: 'column', padding: '4px 5px', }}>
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
											<Button className={classes.clearAllBtnStyle}
												onClick={() => { clearFilters() }} >Clear All <Clear /> </Button>
										</Box>
									</Box>

									<Box sx={{ marginTop: '13px', }}>
										<Typography className={classes.filterHeadersStyle} >Date</Typography>
										<Box sx={{ display: 'flex' }}>
											<LocalizationProvider dateAdapter={AdapterDayjs} >
												<DemoContainer components={['DatePicker']}>
													<DatePicker label="Start" sx={{ marginRight: '15px' }} value={selectedFilters.to}
														onChange={(newValue) => filterHandler('to', newValue)} />
												</DemoContainer>
											</LocalizationProvider>

											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<DemoContainer components={['DatePicker']}>
													<DatePicker label="End" value={selectedFilters.from}
														onChange={(newValue) => filterHandler('from', newValue)} />
												</DemoContainer>
											</LocalizationProvider>
										</Box>
									</Box>
								</Box>
							</AccordionDetails>
						</Accordion>
					</Box>

					<Box className={classes.searchResultsContainer}>
						{searchedData.map((result) => (
							<Box onClick={() => { handleCardData(result) }} sx={{ marginBottom: '10px' }} key={result.id}>
								<ListItem result={result} />
							</Box>
						))}
					</Box>
				</Box>
			</Box>
		</Fragment >
	);
};

export default List;