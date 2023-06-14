import React, { Fragment } from 'react';
import ListResultsItem from './ListItem';
import { useStyles } from './style';
import { Box, FormControl, InputAdornment, Input } from '@mui/material';
import searchedData from './searchedData';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const List = () => {
	const classes = useStyles();

	return (
		<Fragment>
			<Box className={classes.outerBox} >
				<Box sx={{ display: 'flex', flexDirection: 'column', }} >
					<Box sx={{
						padding: '11px 8px',
						display: 'flex',
						justifyContent: 'space-between',

					}} >
						<FormControl variant="standard" fullWidth>
							<Input placeholder='Search Charging Stations...' sx={{
								marginTop: '6px',
								paddingTop: '10px',
								paddingBottom: '10px',
								color: '#282828 !important',
								backgroundColor: '#fff',
								borderRadius: '4px',
								'&::placeholder': {
									color: '#282828 !important',
								}
							}}
								startAdornment={<InputAdornment position="start" >
									<SearchIcon sx={{ paddingLeft: '10px', color: '#282828' }} /></InputAdornment>}
							/>
						</FormControl>
						<Box sx={{
							display: 'flex',
							cursor: 'pointer',
							paddingTop: '5px',
						}}>
							<FilterListIcon sx={{
								marginLeft: '9px',
								color: '#fff',
								backgroundColor: '#282828',
								borderRadius: '4px',
								padding: '14px 10px',
							}} />
						</Box>
					</Box>

					<Box className={classes.searchResultsContainer}>
						{searchedData.map((result) => (
							<ListResultsItem key={result.id} result={result} />
						))}
					</Box>
				</Box>
			</Box>
		</Fragment>
	);
};

export default List;