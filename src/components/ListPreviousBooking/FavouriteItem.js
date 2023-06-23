import React, { Fragment } from 'react';
import searchedData from './searchedData';
import Ratings from '../Rating';
import { CardContent, Typography, Card, Box } from '@mui/material';

import { useStyles } from './style';

const FavoriteListItem = ({ result }) => {
    const { name, location, type, isAvailable, rating } = result;

    const classes = useStyles();

    return (
        <Fragment>
            {isAvailable && (
                <Box className={classes.listItemStyle} sx={{ minWidth: `${searchedData.length > 4 ? '40rem' : '41rem'}`, }}>
                    <Card sx={{ borderRadius: '10px', paddingBottom: 0, display: 'flex', }}>
                        <Box component='img' sx={{ height: 150, width: 250, }}
                            alt='Charging Station' src='https://media.istockphoto.com/id/1387159450/photo/electric-vehicle-charging-station.jpg?s=2048x2048&w=is&k=20&c=10zLHN4WI52eI27_Ha-zL_DKegExVjcdwNWOtjw-XdA='>
                        </Box>
                        <CardContent className={classes.listItemCardStyle}>
                            <Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#454242' }}>{name}</Typography>
                            <Typography sx={{ fontSize: 13, color: '#797575', padding: '4px 0px' }}>
                                {location}
                            </Typography>
                            <Box className={classes.card} sx={{ marginTop: '5px' }}>
                                <Box className={classes.card}>
                                    <Typography sx={{ fontSize: '.75rem', marginRight: '4px' }}>Charging Time:{' '}</Typography>
                                    <Typography sx={{ fontSize: '.75rem', fontWeight: 'bold' }}>{type}</Typography>
                                </Box>
                                <Box className={classes.card}>
                                    <Typography sx={{ fontSize: '.75rem', marginRight: '4px' }}>Ratings{' '}</Typography>
                                    <Ratings rating={rating} />
                                </Box>
                            </Box>
                           
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Fragment>
    );
};

export default FavoriteListItem;
