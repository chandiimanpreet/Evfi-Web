import loadingReducer from "./loadingReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducers";
import { combineReducers } from "redux";

const rootReducer=combineReducers({
    loading:loadingReducer,
    userData:userReducer,
    error:errorReducer
})
export default rootReducer;