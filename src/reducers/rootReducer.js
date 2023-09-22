import loadingReducer from "./loadingReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducers";
import bookingReducer from "./bookingReducer";
import providerReducer from "./providerReducer";
import { combineReducers } from "redux";

const rootReducer=combineReducers({
    loading:loadingReducer,
    userData:userReducer,
    error: errorReducer,
    booking: bookingReducer,
    provider: providerReducer,
})
export default rootReducer;