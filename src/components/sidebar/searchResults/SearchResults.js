import React, { Fragment, useContext, useEffect } from 'react';
import SearchResultsItem from './SearchResultsItem';
import { Box, Typography } from '@mui/material';

import SearchResultsContext from '../../../context/searchResults/searchResultsContext';

const SearchResults = () => {
  const searchResultsContext = useContext(SearchResultsContext);

  const { searchResults, getSearchResults } = searchResultsContext;

  useEffect(() => {
    getSearchResults();

    // eslint-disable-next-line
  }, []);

  console.log(searchResults);

  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          overflowY: ` ${searchResults.length > 3 ? 'scroll' : ''} `,
          marginBottom: '10px',
        }}
      >
        <Typography align="center" variant="h5" m={1}>
          Your Results
        </Typography>
        {searchResults.map((result) => (
          <SearchResultsItem result={result} />
        ))}
      </Box>
    </Fragment>
  );
};

export default SearchResults;
