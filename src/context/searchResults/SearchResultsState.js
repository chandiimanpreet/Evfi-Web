import React, { useReducer } from 'react';
import SearchResultsContext from './searchResultsContext';
import SearchResultsReducer from './searchResultsReducer';

import { GET_SEARCH_RESULTS, SET_CURRENT } from '../Types';

const SearchResultsState = (props) => {
  const initialState = {
    searchResults: [
      {
        name: 'AMG Charging Station',
        location: 'Sector 7, Karnal NH-1, GT-Road, Haryana, 137001',
        type: 'fast',
        isAvailable: true,
        timeSlot: '8:00 - 9:00 AM',
        price: '999',
        rating: 4,
      },
      {
        name: 'AMG Charging Station',
        location: 'Sector 7, Karnal NH-1, GT-Road, Haryana, 137001',
        type: 'fast',
        isAvailable: true,
        timeSlot: '8:00 - 9:00 AM',
        price: '999',
        rating: 4,
      },

      {
        name: 'AMG Charging Station',
        location: 'Sector 7, Karnal NH-1, GT-Road, Haryana, 137001',
        type: 'fast',
        isAvailable: true,
        timeSlot: '8:00 - 9:00 AM',
        price: '999',
        rating: 2,
      },
      {
        name: 'AMG Charging Station',
        location: 'Sector 7, Karnal NH-1, GT-Road, Haryana, 137001',
        type: 'fast',
        isAvailable: true,
        timeSlot: '8:00 - 9:00 AM',
        price: '999',
        rating: 4,
      },
      {
        name: 'AMG Charging Station',
        location: 'Sector 7, Karnal NH-1, GT-Road, Haryana, 137001',
        type: 'fast',
        isAvailable: true,
        timeSlot: '8:00 - 9:00 AM',
        price: '999',
        rating: 3,
      },
    ],
    current: null,
  };

  const [state, dispatch] = useReducer(SearchResultsReducer, initialState);

  // Get Search Results
  const getSearchResults = () => {
    dispatch({
      type: GET_SEARCH_RESULTS,
    });
  };

  // Set Current Station
  const setCurrent = (result) => {
    dispatch({
      type: SET_CURRENT,
      payload: result,
    });
  };

  return (
    <SearchResultsContext.Provider
      value={{
        searchResults: state.searchResults,
        current: state.current,

        getSearchResults,
        setCurrent,
      }}
    >
      {props.children}
    </SearchResultsContext.Provider>
  );
};

export default SearchResultsState;
