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
            sx={{ margin: "10px 0 6px 13px", color: '#ccc' }}
          >
            Your Results
          </Typography>

          <Box className={classes.searchResultsComtainer}>
            {searchResults.map((result) => (
              <SearchResultsItem result={result} />
            ))}
          </Box>
          <br />
        </Box>
      </Box>
    </Fragment>
  );
};

export default Sidebar;
