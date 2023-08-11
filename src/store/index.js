import createSagaMiddleware from 'redux-saga'
import rootReducer from "../reducers/rootReducer";
import userSaga from "../sagas";
import { legacy_createStore as createStore ,applyMiddleware} from 'redux';

const sagaMiddleware = createSagaMiddleware()
const store=createStore(rootReducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(userSaga)

export default store;