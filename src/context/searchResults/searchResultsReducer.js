import { GET_SEARCH_RESULTS, SET_CURRENT } from '../Types';

const func = (state, action) => {
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      return {
        ...state,
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload, // a particular contact becomes current
      };

    default:
      return state;
  }
};

export default func;
