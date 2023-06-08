import React, { Fragment } from 'react';
import searchedData from './searchedData';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { CardContent, Typography, Card, Box, Button } from '@mui/material';

import { useStyles } from './style';


const SearchResultsItem = ({ result }) => {
  const { name, location, type, isAvailable, price, timeSlot, rating } = result;
  const classes = useStyles();

  return (
    <Fragment>
      {isAvailable && (
        <Box
          sx={{
            minWidth: `${
              searchedData.length > 4  ? '26rem' : '29rem'
            }`,
            margin: "0.8rem 0.6rem 0",
            '&:first-child': {  marginTop: '0px', },
          }}
        >
          <Card sx={{ borderRadius: '10px', paddingBottom: 0 }}>
            <CardContent
              sx={{
                paddingTop: '10px',
                '&:last-child': {
                  paddingBottom: 1,
                },
              }}
            >
              <Typography
                sx={{ fontSize: 16, fontWeight: 'bold', color: '#454242' }}
              >
                {name}
              </Typography>
              <Typography sx={{ fontSize: 13, color: '#797575' }}>
                {location}
              </Typography>
              <Box className={classes.card} sx={{ marginTop: '5px' }}>
                <Box className={classes.card}>
                  {
                    <AccessTimeIcon
                      sx={{
                        fontSize: '1rem',
                        color: '#000000',
                        marginRight: '4px',
                      }}
                    />
                  }
                  <Typography sx={{ fontSize: '12px' }}>{timeSlot}</Typography>
                </Box>
                <Box className={classes.card}>
                  <Typography sx={{ fontSize: '.75rem', marginRight: '4px' }}>
                    Charging Time:{' '}
                  </Typography>
                  <Typography sx={{ fontSize: '.75rem', fontWeight: 'bold' }}>
                    {type}
                  </Typography>
                </Box>
                <Box className={classes.card}>
                  <Typography sx={{ fontSize: '.75rem', marginRight: '4px' }}>
                    Ratings{' '}
                  </Typography>
                  <Box>
                    {[...Array(rating).keys()].map(() => {
                      return (
                        <StarIcon sx={{ fontSize: '1rem', color: '#FCDD15' }} />
                      );
                    })}
                  </Box>
                </Box>
              </Box>
              <Box className={classes.card} sx={{ marginTop: '.8rem' }}>
                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#FCDD15',
                      color: '#292929',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      borderRadius: '10px',
                      padding: '1px',
                    }}
                  >
                    BOOK
                  </Button>
                </Box>
                <Box className={classes.card}>
                  <CurrencyRupeeIcon sx={{ paddingTop: '2px' }} />
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

export default SearchResultsItem;