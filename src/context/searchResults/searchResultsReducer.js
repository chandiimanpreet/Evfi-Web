import { GET_SEARCH_RESULTS } from "../Types";

  const func = (state, action) => {
    switch (action.type) {
      case GET_SEARCH_RESULTS:
        return {
            ...state,
        }
  
      default:
        return state;
    }
  };
  
  export default func;
  