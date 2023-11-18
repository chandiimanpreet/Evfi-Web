const initialState = {
    bookings: [],
}

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BOOKINGS':
            return {
                ...state,
                bookings: [action.payload, ...state.bookings.filter(booking => Boolean && Object.keys(booking).length > 0 && !Array.isArray(booking))],
            }

        case 'UPDATE_BOOKING':
            return {
                ...state,
                bookings: state.bookings.map(booking => (booking.bookingId === action.payload.id) ?
                    { ...booking, status: action.payload.status } : booking
                ),
            }

        case 'CLEAR_BOOKING':
            return {
                bookings: [],
            }
        default:
            return state
    }
}
export default bookingReducer;