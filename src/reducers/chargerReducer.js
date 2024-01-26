const initialState = {
    chargers: [],
}

const chargerReducer = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
        case 'GET_USER_CHARGER':
            return {
                ...state,
            }
        case 'SET_USER_CHARGER':
            return {
                ...state,
                chargers: [action.payload, ...state.chargers],

            }
        case 'UPDATE_CHARGER':
            return {
                ...state,
                chargers: state.chargers.map(charger => (charger.chargerId === action.payload.id) ?
                    { ...charger, timeSlot: action.payload.timeSlot } : charger
                ),
            }
        case 'CLEAR_CHARGER':
            return {
                ...state,
                chargers: [],
            }
        default:
            return state
    }
}
export default chargerReducer;