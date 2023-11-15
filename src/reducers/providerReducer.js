const initialState = {
    bookings: [],
}

const providerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BOOKINGS':
            return {
                ...state,
                bookings: [action.payload, ...state.bookings],
            }
        case 'UPDATE_BOOKING':
            return {
                ...state,
                bookings: state.bookings.map(booking => (booking.bookingId === action.payload.id) ?
                    { ...booking, status: action.payload.status } : booking
                ),
            }

        default:
            return state
    }
}
export default providerReducer;