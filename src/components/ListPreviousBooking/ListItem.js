import React, { Fragment } from 'react';
import searchedData from './searchedData';
import Ratings from '../Rating';
import { CurrencyRupee } from '@mui/icons-material';
import { CardContent, Typography, Card, Box, Button } from '@mui/material';

import { useStyles } from './style';

const ListItem = ({ result }) => {
	const { name, location, type, isAvailable, price, rating,img } = result;

	const classes = useStyles();

	return (
		<Fragment>
			{isAvailable && (
				<Box className={classes.listItemStyle} sx={{ minWidth: `${searchedData.length > 4 ? '40rem' : '41rem'}`, }}>
					<Card sx={{ borderRadius: '10px', paddingBottom: 0, display: 'flex', }} >
						<Box component='img' sx={{
							height: 150, width: 250,
						}}
							alt='Charging Station' src={img}>
						</Box>
						<CardContent className={classes.listItemCardStyle}>
							<Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#454242' }}>{name}</Typography>
							<Typography sx={{ fontSize: 13, color: '#797575', padding: '4px 0px' }}>
								{location}
							</Typography>
							<Box className={classes.card} sx={{ marginTop: '5px' }}>
								<Box className={classes.card}>
									<Typography sx={{ fontSize: '.75rem', marginRight: '4px' }}>Charging Type:{' '}</Typography>
									<Typography sx={{ fontSize: '.75rem', fontWeight: 'bold' }}>{type}</Typography>
								</Box>
								<Box className={classes.card}>
									<Typography sx={{ fontSize: '.75rem', marginRight: '4px' }}>Ratings{' '}</Typography>
									<Ratings rating={rating} />
								</Box>
							</Box>
							<Box className={classes.card} sx={{ marginTop: '.8rem', padding: '4px 0px', }}>
								<Box>
									<Button variant="contained" className={classes.bookAgainBtn}>Book Again</Button>
								</Box>
								<Box className={classes.card}>
									<CurrencyRupee sx={{ paddingTop: '2px' }} />
									<Typography fontSize={19}>{price}</Typography>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Box>
			)}
		</Fragment>
	);
};

export default ListItem;