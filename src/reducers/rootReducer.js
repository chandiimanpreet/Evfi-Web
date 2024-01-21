import { combineReducers } from "redux";

import loadingReducer from "./loadingReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducers";
import bookingReducer from "./bookingReducer";
import providerReducer from "./providerReducer";
import chargerReducer from "./chargerReducer";

const rootReducer = combineReducers({
    loading: loadingReducer,
    userData: userReducer,
    error: errorReducer,
    booking: bookingReducer,
    provider: providerReducer,
    charger: chargerReducer,
})

export default rootReducer;