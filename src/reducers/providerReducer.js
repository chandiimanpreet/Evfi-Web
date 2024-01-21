const initialState = {
    requests: [],
}

const providerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PROVIDER_REQUEST':
            return {
                ...state,
            }
        case 'SET_PROVIDER_REQUEST':
            return {
                ...state,
                requests: [action.payload, ...state.requests],
            }
        case 'UPDATE_BOOKING':
            return {
                ...state,
                requests: state.requests.map(booking => (booking.bookingId === action.payload.id) ?
                    { ...booking, status: action.payload.status } : booking
                ),
            }

        default:
            return state
    }
}
export default providerReducer;