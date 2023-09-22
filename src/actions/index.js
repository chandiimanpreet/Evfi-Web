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

const setBooking = (data) => ({
    type: 'SET_BOOKING',
    payload: data
});

const setProvider = (data) => ({
    type: 'SET_PROVIDER',
    payload: data
});

const getBook = () => ({
    type: 'GET_BOOKING',
});


export {
    setLoading, setError, loadUser, setUser, logout, clearUser, clearError, addUserData, login, setPhoneNo, addChargerAction,
    setBooking, getBook, setProvider
};