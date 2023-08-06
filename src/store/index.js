import { configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import rootReducer from "../reducers/rootReducer";
import userSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer:rootReducer,
    middleware:[sagaMiddleware]
})
sagaMiddleware.run(userSaga)

export default store;