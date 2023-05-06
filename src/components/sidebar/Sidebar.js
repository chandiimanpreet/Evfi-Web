import React, { Fragment, useContext } from 'react';
import SearchResultsItem from './SearchResultsItem';

import { useStyles } from './style';

import { Box, Typography } from '@mui/material';

import SearchResultsContext from '../../context/searchResults/searchResultsContext';

const Sidebar = () => {
  const searchResultsContext = useContext(SearchResultsContext);

  const { searchResults } = searchResultsContext;

  const classes = useStyles();

  return (
    <Fragment>
      <Box className={classes.outerBox}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            align="left"
            sx={{
              marginLeft: '13px',
              marginTop: '8px',
              marginBottom: '10px',
              color: '#ddd',
            }}
          >
            Your Results
          </Typography>

          <Box
            sx={{
              overflowX: 'hidden',
              overflowY: 'auto',
              position: 'relative',
              top: '-5px',
              '&::-webkit-scrollbar': {
                width: '15px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#282828',
                backgroundClip: 'content-box',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: 2,
                backgroundColor: '#ddd',
              },
            }}
          >
            {searchResults.map((result) => (
              <SearchResultsItem result={result} />
            ))}
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Sidebar;
