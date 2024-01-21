const setLoading = () => ({
    type: "SET_LOADING"
});

const setError = (error) => ({
    type: "SET_ERROR",
    payload: error
});

const setUser = (user) => ({
    type: 'SET_USER',
    payload: user
});

const clearError = () => ({
    type: 'CLEAR_ERROR'
});

const loadUser = () => ({
    type: 'GET_USER'
});

const logout = () => ({
    type: 'LOGOUT'
});

const clearUser = () => ({
    type: 'CLEAR_USER'
});

const addUserData = (data) => ({
    type: 'ADD_USER_DATA',
    payload: data
});

const login = () => ({
    type: 'LOGIN_USER'
});

const setPhoneNo = (number) => ({
    type: 'SET_PHONE',
    payload: number
});

const addChargerAction = (res) => ({
    type: 'ADD_CHARGER',
    payload: res
});

const setUserBooking = (data) => ({
    type: 'SET_USER_BOOKING',
    payload: data,
});

// const getBookings = () => ({
//     type: 'GET_USER_BOOKING',
// });

// const getRequests = () => ({
//     type: 'GET_PROVIDER_REQUEST',
// });

const setProviderRequests = (data) => ({
    type: 'SET_PROVIDER_REQUEST',
    payload: data,
});

const bookingUpdate = (data) => ({
    type: 'UPDATE_BOOKING',
    payload: data,       // id, status
});

const setChargers = (data) => ({
    type: 'SET_USER_CHARGER',
    payload: data,
});

const chargerUpdate = (data) => ({
    type: 'UPDATE_CHARGER',
    payload: data,      // id, timeSlot
});

const getChargersID = () => ({
    type: 'GET_CHARGERS_ID',
});

const setChargersID = (data) => ({
    type: 'SET_CHARGERS_ID',
    payload: data,
});

export {
    setLoading, setError, loadUser, setUser, logout, clearUser, clearError, addUserData, login, setPhoneNo, addChargerAction,
    bookingUpdate, setUserBooking, setProviderRequests, chargerUpdate, setChargers, getChargersID, setChargersID
};