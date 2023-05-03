import React, { Fragment } from 'react';
import SearchResults from './searchResults/SearchResults';

import Box from '@mui/material/Box';
import { useStyles } from './searchResults/style';

const Sidebar = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Box className={classes.outerBox} >
        <SearchResults />
      </Box>
    </Fragment>
  );
};

export default Sidebar;
