const initialState = {
    chargerId: '',
    status: '',
    timeSlot: '',
    uId: '',
    price: '',
}

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BOOKING':
            console.log(action.payload)
            return {
                ...action.payload,
            }

        case 'CLEAR_BOOKING':
            return {
                chargerId: '',
                chargerInfo: null,
                status: '',
                timeSlot: '',
                uId: '',
            }
        default:
            return state
    }
}
export default bookingReducer;