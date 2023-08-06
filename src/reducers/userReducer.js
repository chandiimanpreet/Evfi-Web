const initialState = {
    user: null,
    chargers: null,
    phone: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state, user: action.payload
            }
        case 'ADD_USER_DATA':
            console.log("object");
            return {
                ...state, user: { ...state.user, ...action.payload }
            }
        case 'CLEAR_USER':
            return {
                user: null, chargers: null, phone: ''
            }
        case 'SET_PHONE':
            return {
                ...state, phone: action.payload
            }
        default:
            return state
    }
}
export default userReducer;