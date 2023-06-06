import React, { Fragment } from 'react';
import SearchResultsItem from './SearchResultsItem';
import { useStyles } from './style';
import { Box, Typography } from '@mui/material';
import searchedData from './searchedData';

const Sidebar = () => {
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
            {searchedData.map((result) => (
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