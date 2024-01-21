const initialState = {
    chargers: [],
    uniqueChargersID: [],
}

const chargerReducer = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
        case 'GET_USER_CHARGER':
            return {
                ...state,
                // chargers: [...state.chargers],
            }
        case 'GET_CHARGERS_ID':
            return {
                ...state,
                uniqueChargersID: [...state.uniqueChargersID],
            }
        case 'SET_CHARGERS_ID':
            return {
                ...state,
                uniqueChargersID: [action.payload, ...state.uniqueChargersID],
            }
        case 'SET_USER_CHARGER':
            return {
                ...state,
                chargers: [action.payload , ...state.chargers],

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
                chargers: [],
            }
        default:
            return state
    }
}
export default chargerReducer;