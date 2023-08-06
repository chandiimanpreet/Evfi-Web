import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "./loadingReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducers";

const rootReducer=combineReducers({
    loading:loadingReducer,
    userData:userReducer,
    error:errorReducer
})
export default rootReducer;