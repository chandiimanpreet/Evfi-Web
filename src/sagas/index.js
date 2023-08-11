import { call, put, select, take, takeEvery } from 'redux-saga/effects'
import { getUser, logInUser, logoutUser } from '../utils/auth/user';
import { addUserData, clearError, clearUser, setError, setLoading, setUser } from '../actions';

// worker saga
function* getUserData() {
    try {
        const userData = yield call(getUser);
        yield put(setUser(userData.user));
    } catch (error) {
        yield put(setError(error));
    } finally {
        yield put(setLoading());
    }
}


function* logout() {
    try {
        yield call(logoutUser);
        yield put(clearError());
        yield put(clearUser());
    } catch (error) {
        yield put(setError(error));
    }
}

const getNumber=state=>state.userData.phone;
function* loginUserData(){
    try{
        const number=yield select(getNumber)
        const data=yield call(logInUser,number);
        yield put(addUserData(data))
    }catch(error){
        yield put(setError(error));
    }
}


// watcher saga
function* userSaga() {
    yield take('GET_USER');
    yield call(getUserData);
    yield takeEvery('LOGIN_USER',loginUserData);
    yield takeEvery('LOGOUT',logout);
}


export default userSaga;