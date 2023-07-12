import React, { Fragment } from 'react';
import searchedData from './searchedData';
import Ratings from '../Rating';
import { CurrencyRupee } from '@mui/icons-material';
import { Typography, Box, Button } from '@mui/material';

import { useStyles } from './style';

const ListItem = ({ result }) => {
	const { name, location, type, isAvailable, price, rating, img } = result;

	// Styling
	const classes = useStyles();

	return (
		<Fragment>
			{
				isAvailable && (
					<Box className={classes.listItemStyle} sx={{ minWidth: `${searchedData.length > 4 ? '40rem' : '41rem'}`, }}>
					<Box sx={{ borderRadius: '10px', paddingBottom: 0, display: 'flex', }} >
						<Box component='img' sx={{ height: 150, width: 250, borderRadius: '10px 0px 0px 10px', }}
							alt='Charging Station' src={img}>
						</Box>
						<Box className={classes.listItemCardStyle}>
							<Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#fff', fontFamily: 'Manrope !important' }}>{name}</Typography>
							<Typography sx={{ fontSize: 13, color: '#bbb', padding: '4px 0px', }}>
								{location}
							</Typography>
							<Box className={classes.card} sx={{ marginTop: '5px' }}>
								<Box className={classes.card}>
									<Typography className={classes.cardTextStyle} sx={{ marginRight: '4px', }}>Charging Type:{' '}</Typography>
									<Typography className={classes.cardTextStyle} sx={{ fontWeight: 'bold' }}>{type}</Typography>
								</Box>
								<Box className={classes.card}>
									<Typography className={classes.cardTextStyle} sx={{ marginRight: '4px', }}>Ratings{' '}</Typography>
									<Ratings rating={rating} />
								</Box>
							</Box>
							<Box className={classes.card} sx={{ marginTop: '.8rem', padding: '4px 0px', }}>
								<Box>
									<Button variant="contained" className={classes.bookAgainBtn}>Book Again</Button>
								</Box>
								<Box className={classes.card}>
									<CurrencyRupee sx={{ paddingTop: '2px' }} />
									<Typography fontSize={19} sx={{ fontFamily: 'Manrope !important', fontWeight: '500', }}>{price}</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
				)
			}
		</Fragment>
	);
};

export default ListItem;
