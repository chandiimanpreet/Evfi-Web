import React, { useContext, Fragment } from 'react';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { CardContent, Typography, Card, Box } from '@mui/material';
import Button from '@mui/material/Button';

import { useStyles } from './style';

import SearchResultsContext from '../../../context/searchResults/searchResultsContext';

const SearchResultsItem = ({ result }) => {
  const searchResultsContext = useContext(SearchResultsContext);

  const {searchResults} = searchResultsContext;

  const { name, location, type, isAvailable, price, timeSlot, rating } = result;

  const classes = useStyles();

  return (
    <Fragment>
      {isAvailable === true && (
        <Box
          sx={{
            minWidth: ` ${searchResults.length > 3 && isAvailable ? '26rem' : '27rem'}`,
            marginLeft: '8px',
            marginTop: '.5rem',
            marginRight: '4rem',
            '&:first-child': {
              marginTop: '0px',
            },
          }}
        >
          <Card sx={{ borderRadius: '18px', paddingBottom: 0 }}>
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
                    <StarIcon sx={{ fontSize: '1rem', color: '#FCDD15' }} />
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
