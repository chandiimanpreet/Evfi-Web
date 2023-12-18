import React, { useState, Fragment, useEffect, useMemo } from 'react';
import ListItem from './ListItem';
import FilterGroup from '../Filters/FilterGroup';
import {
	STATUS_CANCELED, STATUS_REQUESTED,
	STATUS_ACCEPTED,
	STATUS_DECLINED,
	STATUS_CHARGING_COMPLETED,
	STATUS_CHARGING,
} from '../../constants';
import { chargerTypeOptions, sortByOptions } from '../../constants';
import {
	FormControl, InputAdornment, Input, Accordion, AccordionDetails, Button, AccordionSummary, Box,
	Typography, Link
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Search, FilterList, Clear, } from '@mui/icons-material';
import { useStyles } from './style';
import { getUserAndChargers } from '../../utils/auth/user';

const List = ({ setFetchChargerFromList, user, userBooking }) => {

	//States
	const [show, setShow] = useState("pending");
	const [showFilter, setShowFilter] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState({
		chargerType: [],
		sortBy: '',
		from: null,
		to: null,
	});
	const [pendingBookings, setPendingBookings] = useState(null);
	const [recentBookings, setRecentBookings] = useState(null);

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

	const fetchData = (charger) => setFetchChargerFromList(charger);

	const pendingBookingsInfo = useMemo(() => {
		return userBooking.filter((charger) =>
			charger.status === STATUS_REQUESTED || charger.status === STATUS_ACCEPTED || charger.status === STATUS_CHARGING
		);
	}, [userBooking]);

	console.log(pendingBookingsInfo)

	const recentBookingsInfo = useMemo(() => {
		return userBooking.filter((charger) =>
			charger.status === STATUS_DECLINED || charger.status === STATUS_CANCELED || charger.status === STATUS_CHARGING_COMPLETED
		);
	}, [userBooking]);

	useEffect(() => {
		const helperFunction = async () => {
			const response1 = await Promise.all(pendingBookingsInfo.map(async (charger) => {
				const fetchedChargerRequest = await getUserAndChargers(charger?.uId, charger?.chargerId);
				return [fetchedChargerRequest.charger, charger.status, charger.timeSlot, charger.bookingId];
			}));

			setPendingBookings(response1);
			const response2 = await Promise.all(recentBookingsInfo.map(async (charger) => {
				const fetchedChargerRequest = await getUserAndChargers(charger?.uId, charger?.chargerId);
				return [fetchedChargerRequest.charger, charger.status, charger.timeSlot];
			}));
			setRecentBookings(response2);
		}
		helperFunction();
	}, [pendingBookingsInfo, recentBookingsInfo]);

	return (
		<Fragment>
			<Box sx={{ width: ['100vw', '100vw', '60vw'] }} className={classes.outerBox}>
				<Box width='100%' >
					<Box sx={{ width: '90%', padding: { xs: '11px 0px 2px 15px', md: '11px 0px 2px 15px' }, display: 'flex' }} >
						<FormControl variant="standard" fullWidth>
							<Input sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }} placeholder='Search Charging Stations...' className={classes.inputField}
								startAdornment={<InputAdornment position="start" >
									<Search sx={{ paddingLeft: '10px', color: '#fff' }} /></InputAdornment>}
							/>
						</FormControl>
						<Box sx={{ display: 'flex', cursor: 'pointer', paddingTop: '5px', }} onClick={toggleFilter}>
							<FilterList className={classes.filterIconStyle} />
						</Box>
					</Box>

					<Box sx={{ marginLeft: '8px', marginTop: '6px', marginBottom: showFilter ? '4px' : '0px' }}>
						<Accordion expanded={showFilter} sx={{ width: '98%' }}>
							<AccordionSummary sx={{ display: 'none' }}>
							</AccordionSummary>
							<AccordionDetails >
								<Box sx={{ display: 'flex', flexDirection: 'column', padding: '4px 5px', }}>
									<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
										<Box>
											<Typography mb={1} fontFamily='Manrope !important'
												fontWeight='600' color='#444' >Charger Type</Typography>
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
												onClick={() => { clearFilters() }} >Clear <Clear /> </Button>
										</Box>
									</Box><br />
									<Box>
										<Typography className={classes.filterHeadersStyle} >Date</Typography>
										<Box>
											<LocalizationProvider dateAdapter={AdapterDayjs} >
												<DemoContainer components={['DatePicker']}>
													<DatePicker label="Start" value={selectedFilters.to}
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

					<Box marginX={2} paddingY={2} sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
						<Box sx={{ display: 'flex', gap: '1rem' }} >
							<Link style={{
								textDecoration: show === 'pending' ? 'underline' : 'none',
								fontSize: '1rem',
								textUnderlineOffset: '8px',
								color: 'antiquewhite', cursor: 'pointer',
							}}
								onClick={() => setShow("pending")}>
								Pending
							</Link>
							<Link style={{
								textDecoration: show === 'recent' ? 'underline' : 'none', fontSize: '1rem',
								textUnderlineOffset: '8px',
								color: 'antiquewhite', cursor: 'pointer',
							}}
								onClick={() => setShow("recent")}>
								Recent
							</Link>
						</Box>
					</Box>

					<Box display='flex' justifyContent='center'>
						<Box sx={{ maxHeight: ['calc(100vh - 11.5rem)', 'calc(100vh - 11.5rem)', 'calc(100vh - 8rem)'] }} className={classes.searchResultsContainer}>
							{
								show === "pending" ?
									!pendingBookingsInfo.length > 0 ? 'No new Bookings Available' : (
										pendingBookings?.map(([chargerData, status, timeSlot, bookingId]) => ({ chargerData, status, timeSlot, bookingId })).map((charger, idx) => (
											<Box sx={{ marginBottom: { xs: '10px', md: '10px' } }} key={idx} onClick={() => { fetchData(charger) }} >
												<ListItem data={charger} show={show} />
											</Box>
										)))
									:
									!recentBookingsInfo.length > 0 ? 'No Recent Bookings Available' : (
										recentBookings?.map(([chargerData, status, timeSlot]) => ({ chargerData, status, timeSlot })).map((charger, idx) => (
											<Box sx={{ marginBottom: { xs: '10px', md: '0px' } }} key={idx} onClick={() => { fetchData(charger) }} >
												<ListItem data={charger} show={show} />
											</Box>
										)))
							}
						</Box>
					</Box>
				</Box>
			</Box>
		</Fragment>
	);
};

export default List;