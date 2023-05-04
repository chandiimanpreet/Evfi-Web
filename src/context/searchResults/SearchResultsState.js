import React, { useReducer } from 'react';
import SearchResultsContext from './searchResultsContext';
import SearchResultsReducer from './searchResultsReducer';

import { GET_SEARCH_RESULTS } from '../Types';

const SearchResultsState = (props) => {

    const initialState = {
        searchResults: [
            {
                name: 'AMG Charging Station',
                location: 'Sector 7, Karnal NH-1, GT-Road, Haryana, 137001',
                type: "fast",
                isAvailable: true,
                timeSlot: "8:00 - 9:00 AM",
                price: "999",
                rating: "4"
            },
            {
                name: 'AMG Charging Station',
                location: 'Sector 7, Karnal NH-1, GT-Road, Haryana, 137001',
                type: "fast",
                isAvailable: true,
                timeSlot: "8:00 - 9:00 AM",
                price: "999",
                rating: "4"
            },
            {
                name: 'AMG Charging Station',
                location: 'Sector 7, Karnal NH-1, GT-Road, Haryana, 137001',
                type: "fast",
                isAvailable: true,
                timeSlot: "8:00 - 9:00 AM",
                price: "999",
                rating: "4"
            },
            {
                name: 'AMG Charging Station',
                location: 'Sector 7, Karnal NH-1, GT-Road, Haryana, 137001',
                type: "fast",
                isAvailable: true,
                timeSlot: "8:00 - 9:00 AM",
                price: "999",
                rating: "4"
            },

        ],
    }

    const [state, dispatch] = useReducer(SearchResultsReducer, initialState);

    const getSearchResults = () => {
        dispatch({
            type: GET_SEARCH_RESULTS,
        })
    }



  return (
    <SearchResultsContext.Provider value={{
        searchResults: state.searchResults,

        getSearchResults,
    }}>
    {props.children}
    </SearchResultsContext.Provider>

  )
}

export default SearchResultsState
