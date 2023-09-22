const initialState = {
    user: null,
    chargers: [],
    phone: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                chargers: action.payload.chargers,
            }
        case 'ADD_USER_DATA':
            console.log("object");
            return {
                ...state, user: {
                    ...state.user,
                    ...action.payload,
                }
            }
        case 'CLEAR_USER':
            return {
                user: null,
                chargers: [],
                phone: ''
            }
        case 'SET_PHONE':
            return {
                ...state,
                phone: action.payload
            }
        case 'ADD_CHARGER':
            return {
                ...state,
                user: {
                    ...state.user,
                    level3: true,
                }
            }
        default:
            return state
    }
}
export default userReducer;